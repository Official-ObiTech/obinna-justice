import type { MetadataRoute } from "next";
import { site } from "./data";

// Web app manifest: lets visitors install the portfolio like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${site.name} | ${site.role}`,
    short_name: site.name,
    description: site.tagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#07070b",
    theme_color: "#07070b",
    categories: ["portfolio", "developer", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    screenshots: [
      { src: "/pwa/screenshot-wide.jpg", sizes: "1440x900", type: "image/jpeg", form_factor: "wide", label: "Home page" },
      { src: "/pwa/screenshot-narrow.jpg", sizes: "780x1688", type: "image/jpeg", form_factor: "narrow", label: "Home page on mobile" },
    ],
    shortcuts: [
      { name: "Projects", url: "/#projects" },
      { name: "Contact", url: "/#contact" },
    ],
  };
}
