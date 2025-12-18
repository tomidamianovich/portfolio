import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [100, 75],
  },
  webpack: (config) => {
    // Ensure JSON files can be resolved
    config.resolve.extensions.push(".json");
    return config;
  },
  turbopack: {},
};

export default nextConfig;
