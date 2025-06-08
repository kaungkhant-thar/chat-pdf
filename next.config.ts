import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias["canvas"] = false;
    }
    return config;
  },
};

export default nextConfig;
