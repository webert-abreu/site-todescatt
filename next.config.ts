import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dwvapp.com.br",
      },
      {
        protocol: "https",
        hostname: "apisandbox.dwvapp.com.br",
      },
      {
        protocol: "https",
        hostname: "*.dwvapp.com.br",
      },
    ],
  },
};

export default nextConfig;
