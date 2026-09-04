import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
       { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
