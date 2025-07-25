import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No need for experimental.appDir if using a version < 13

   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
