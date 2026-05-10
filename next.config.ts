import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        assetPrefix: "/Ar-Ay",
        basePath: "/Ar-Ay",
        output: "export" as const,
        trailingSlash: true
      }
    : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    unoptimized: isGithubPages
  },
  poweredByHeader: false,
  typedRoutes: false
};

export default withNextIntl(nextConfig);
