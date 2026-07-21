import { randomBytes } from "node:crypto";

// OAuth flows need a real request/response and Node crypto — no static optimization.
export const runtime = "nodejs";

// Decap's GitHub backend opens this route in a pop-up (base_url + auth_endpoint, which
// public/admin/config.yml sets to `api/decap/auth`) and expects to be walked through
// GitHub's OAuth "web application flow". See decapcms.org/docs/backends-overview/ and
// packages/decap-cms-lib-auth/src/netlify-auth.js (`authenticate`) in the decap-cms repo.
const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";

// Minimal scope Decap's GitHub backend needs: `repo` (read/write repository content on
// public *or* private repos) and `user` (identify the committing user). Matches the
// maintained Vercel reference daresaydigital/decap-cms-oauth (lib/scopes.ts: `github:
// "repo,user"`).
const OAUTH_SCOPE = "repo,user";

// Name of the short-lived cookie that carries the CSRF state to the callback.
const STATE_COOKIE = "decap_oauth_state";

/** Public-facing origin of this request, honouring the platform's proxy headers. */
function getOrigin(request: Request): string {
  const headers = request.headers;
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  const proto = (headers.get("x-forwarded-proto") ?? "https").split(",")[0].trim();
  return host ? `${proto}://${host}` : new URL(request.url).origin;
}

export async function GET(request: Request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    // No fabricated fallback — fail loudly but cleanly (no stack trace to the browser).
    return new Response(
      "Decap CMS OAuth is not configured on this server: the GITHUB_OAUTH_CLIENT_ID " +
        "environment variable is missing.",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const redirectUri = `${getOrigin(request)}/api/decap/callback`;
  const state = randomBytes(32).toString("hex");

  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", OAUTH_SCOPE);
  authorizeUrl.searchParams.set("state", state);

  // Persist the state in an HttpOnly cookie so the callback can verify it (the browser
  // JS never needs to read it). SameSite=Lax — not Strict — is deliberate: GitHub returns
  // the user to the callback via a top-level cross-site GET navigation, and Lax is the
  // strictest policy that still sends the cookie on that navigation. Secure + short TTL.
  const stateCookie = [
    `${STATE_COOKIE}=${state}`,
    "Path=/api/decap",
    "Max-Age=600",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      "Set-Cookie": stateCookie,
      "Cache-Control": "no-store",
    },
  });
}
