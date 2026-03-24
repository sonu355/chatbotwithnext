import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-js-extract"],
  reactCompiler: true,
};

export default nextConfig;
