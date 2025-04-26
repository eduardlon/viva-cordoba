import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'cf.bstatic.com',
      'dynamic-media-cdn.tripadvisor.com',
      'images.unsplash.com'
    ],
  }
};

export default nextConfig;