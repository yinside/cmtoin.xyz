import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "cmtoin.xyz" }],
        destination: "https://www.cmtoin.xyz/",
        permanent: true,
      },
      {
        source: "/:path*/",
        has: [{ type: "host", value: "cmtoin.xyz" }],
        destination: "https://www.cmtoin.xyz/:path*/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
