import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Never ship source maps to the browser — keeps JS unreadable in DevTools Sources tab
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          // Serve /admin as /admin/index.html
          // Note: /admin/ (with trailing slash) is handled by Next.js's default trailing-slash
          // redirect (308 to /admin) before rewrites run, so no explicit rule needed here
          source: "/admin",
          destination: "/admin/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
