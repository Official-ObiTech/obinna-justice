import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ServiceWorker from "./components/service-worker";
import ThemeToggle from "./components/theme-toggle";
import { themeInitScript } from "./components/theme";
import { site } from "./data";
import { siteUrl } from "./site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.tagline,
  openGraph: {
    title,
    description: site.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.tagline,
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the theme script sets data-theme before React loads.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
        <ThemeToggle />
        <ServiceWorker />
      </body>
    </html>
  );
}
