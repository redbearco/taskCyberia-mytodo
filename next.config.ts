import type { NextConfig } from "next/types";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default withPWA({
  dest: "public", 
  register: true,
  skipWaiting: true,
})(nextConfig);
