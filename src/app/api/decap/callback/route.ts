// OAuth flows need a real request/response and a server-side secret — no static
// optimization, Node runtime (the client secret must never reach the browser).
export const runtime = "nodejs";

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const STATE_COOKIE = "decap_oauth_state";
const PROVIDER = "github";

// Expire the state cookie once it has served its purpose.
const CLEAR_STATE_COOKIE =
  `${STATE_COOKIE}=; Path=/api/decap; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;

/** Public-facing origin of this request, honouring the platform's proxy headers. */
function getOrigin(request: Request): string {
  const headers = request.headers;
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  const proto = (headers.get("x-forwarded-proto") ?? "https").split(",")[0].trim();
  return host ? `${proto}://${host}` : new URL(request.url).origin;
}

/** Read a single cookie value out of the request's Cookie header. */
function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return null;
}

/**
 * Minimal HTML page whose inline script performs the exact postMessage handshake Decap's
 * admin bundle expects. Verified against packages/decap-cms-lib-auth/src/netlify-auth.js
 * (`handshakeCallback` / `authorizeCallback`) in the decap-cms repo:
 *
 *   1. popup  -> opener : "authorizing:github"                    (broadcast; no secret)
 *   2. opener -> popup  : echoes that message back, which reveals the opener's origin
 *   3. popup  -> opener : "authorization:github:success:<json>"   (sent to that origin)
 *
 * The opener only accepts messages where e.origin === base_url, matches the
 * "authorization:github:success:" prefix, JSON.parses the remainder, and reads `.token`
 * (packages/decap-cms-backend-github/src/implementation.tsx `authenticate`: `this.token
 * = state.token`). The pop-up form is confirmed by the maintained references
 * daresaydigital/decap-cms-oauth (api/callback.ts) and vencax/netlify-cms-github-oauth-
 * provider (login_script.js).
 */
function renderHandshake(
  status: "success" | "error",
  content: Record<string, string>,
): string {
  // Embed the payload as a JS object literal. Escape "<" so a value can never break out of
  // the <script> element (e.g. a literal "</script>"). GitHub-issued tokens are limited to
  // [A-Za-z0-9_], so no further escaping is load-bearing here. The browser re-serialises the
  // object with JSON.stringify, so the CMS receives byte-for-byte
  // `authorization:github:success:{...}`.
  const embedded = JSON.stringify(content).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8" /><title>Decap CMS Authorization</title></head>
<body>
<script>
  (function () {
    if (!window.opener) { return; }
    var content = ${embedded};
    function receiveMessage(message) {
      // Send the token only to the exact origin that answered our announcement — never "*".
      window.opener.postMessage(
        'authorization:${PROVIDER}:${status}:' + JSON.stringify(content),
        message.origin
      );
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    // Announce readiness. The broadcast ("*") is required and safe: this message carries
    // no secret; its sole purpose is to make the opener reply so we learn its origin (the
    // origin we then target above). This mirrors every maintained reference implementation.
    window.opener.postMessage('authorizing:${PROVIDER}', '*');
  })();
</script>
</body>
</html>`;
}

function htmlResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": CLEAR_STATE_COOKIE,
    },
  });
}

function errorText(message: string, status: number): Response {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = readCookie(request, STATE_COOKIE);

  // CSRF protection: the state echoed back by GitHub MUST match the one /auth stored in
  // the HttpOnly cookie. On any mismatch we refuse *before* exchanging the code or running
  // the postMessage handshake, so a forged/stale request can never coax out a token.
  if (!state || !expectedState || state !== expectedState) {
    return errorText(
      "OAuth state validation failed. Please close this window and start the sign-in again.",
      403,
    );
  }

  if (!code) {
    return errorText("Missing OAuth `code` parameter.", 400);
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return errorText(
      "Decap CMS OAuth is not configured on this server: GITHUB_OAUTH_CLIENT_ID and/or " +
        "GITHUB_OAUTH_CLIENT_SECRET are missing.",
      500,
    );
  }

  const redirectUri = `${getOrigin(request)}/api/decap/callback`;

  let accessToken: string;
  try {
    // Server-to-server exchange. The client secret lives only in this request body and
    // never touches any response sent to the browser.
    const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = (await tokenResponse.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (data.error || !data.access_token) {
      // GitHub's error fields describe the *code* exchange (e.g. "bad_verification_code")
      // and never contain the client secret, so they are safe to relay to the CMS.
      const reason = data.error_description || data.error || "no access_token returned";
      return htmlResponse(
        renderHandshake("error", { error: `GitHub token exchange failed: ${reason}` }),
      );
    }

    accessToken = data.access_token;
  } catch (e) {
    // Never surface the exception detail: the failing request carries the client secret.
    console.log(e instanceof Error ? e.message : String(e));
    return htmlResponse(
      renderHandshake("error", { error: "Could not reach GitHub to exchange the OAuth code." }),
    );
  }

  // Payload shape the CMS reads: { token, provider }. See implementation.tsx `authenticate`.
  return htmlResponse(renderHandshake("success", { token: accessToken, provider: PROVIDER }));
}
