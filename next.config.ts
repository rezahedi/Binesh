import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://ds055uzetaobb.cloudfront.net/**")],
  },
};

export default nextConfig;
