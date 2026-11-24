import type { MetadataRoute } from "next";
import { projects } from "./data";
import { siteUrl } from "./site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/projects`, priority: 0.9 },
    ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}`, priority: 0.8 })),
  ];
}
