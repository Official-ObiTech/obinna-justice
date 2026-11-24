"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "../../data";
import CvButton from "../cv-button";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

// Not in TypeScript's DOM types yet.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function InstallButton({ className }: { className: string }) {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstallEvent(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Only shown in browsers that support installing (Chrome, Edge, Android…).
  if (!installEvent) return null;

  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        await installEvent.prompt();
        await installEvent.userChoice;
        setInstallEvent(null);
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
      Install app
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-ink/80 backdrop-blur-lg" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/#top" className="flex items-center gap-2.5 font-semibold" onClick={() => setOpen(false)}>
          {site.photo ? (
            <Image
              src={site.photo}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-accent/60"
            />
          ) : (
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-strong text-xs font-bold text-white">
              {site.initials}
            </span>
          )}
          <span className="text-sm tracking-tight">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-fg/5 hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <InstallButton className="ml-2 inline-flex h-9 items-center gap-2 rounded-full border border-fg/20 px-4 text-sm font-medium text-fg transition-colors hover:bg-fg/10" />
          <CvButton className="ml-2 inline-flex h-9 items-center gap-2 rounded-full bg-accent-strong px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-strong/85" />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            className="-mr-2 grid h-10 w-10 place-items-center rounded-lg text-fg"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
              {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line px-4 pb-4 pt-2 lg:hidden">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-lg px-3 py-3 text-base text-muted hover:bg-fg/5 hover:text-fg"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-2 grid gap-2">
          <CvButton className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent-strong text-sm font-semibold text-white" />
          <InstallButton className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-fg/20 text-sm font-medium text-fg" />
        </div>
      </div>
    </header>
  );
}
