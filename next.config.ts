import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/guides/[slug]/pdf": ["./private/guides/pdf/**/*.pdf"],
    "/guides/*": ["./content/guides/**/*"],
  },
};

export default nextConfig;
