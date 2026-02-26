import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No "output: export" needed — Vercel handles Next.js natively
  // No basePath needed — Vercel serves at root domain
  images: { unoptimized: true },
};

export default nextConfig;
