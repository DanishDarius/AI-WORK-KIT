import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/guides/[slug]/pdf": ["./private/guides/pdf/**/*.pdf"],
  },
};

export default nextConfig;
