import type { MetadataRoute } from "next";
import { siteUrl } from "./site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/offline.html" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
