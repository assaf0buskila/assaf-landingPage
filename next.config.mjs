/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/website.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            // RFC 8288 discovery links for agents: markdown alternate + site metadata.
            key: "Link",
            value:
              '</index.md>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/plain", </pricing.md>; rel="license"; type="text/markdown"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
