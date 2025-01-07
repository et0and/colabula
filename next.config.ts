import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "08574d4f2d3beaa6fbdf56499dc5f598.r2.cloudflarestorage.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "pub-6d3acd257d7d480e96fc6a429cc2df74.r2.dev",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
