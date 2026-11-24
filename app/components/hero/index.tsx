import { site } from "../../data";
import CvButton from "../cv-button";
import Socials from "../socials";
import ThreeBackground from "../ThreeBackground";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-ink px-4"
    >
      <ThreeBackground />

      {/* Soften the scene a little behind the text and fade it into the page below */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_center,color-mix(in_oklab,var(--ink)_45%,transparent),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      {/* pointer-events-none lets mouse users drag the 3D scene behind the text */}
      <div className="pointer-events-none mx-auto max-w-5xl pt-16 text-center">
        <h1 className="font-bold tracking-tight text-fg">
          <span className="fade-up block text-xl font-medium text-fg/80 sm:text-2xl md:text-3xl">
            Hey, I’m
          </span>
          <span
            className="fade-up mt-2 block text-6xl leading-[0.95] tracking-tighter dark:drop-shadow-[0_4px_30px_rgb(0_0_0/0.5)] sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ animationDelay: "120ms" }}
          >
            {site.name}
          </span>
        </h1>

        <p
          className="fade-up mx-auto mt-6 max-w-xl text-base text-fg/75 sm:text-lg md:text-xl"
          style={{ animationDelay: "240ms" }}
        >
          <span className="font-semibold text-fg">{site.role}.</span> {site.tagline}
        </p>

        <div
          className="fade-up pointer-events-auto mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "360ms" }}
        >
          <a
            href="#projects"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent-strong px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-strong/85 sm:w-auto"
          >
            View my work
          </a>
          <CvButton className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-fg/25 bg-fg/5 px-7 text-sm font-semibold text-fg backdrop-blur transition-colors hover:bg-fg/10 sm:w-auto" />
        </div>

        <div className="fade-up pointer-events-auto mt-8" style={{ animationDelay: "480ms" }}>
          <Socials className="justify-center" />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-fg/50 transition-colors hover:text-fg sm:block"
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" aria-hidden>
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="11" cy="10" r="2.5" fill="currentColor" className="motion-safe:animate-bounce" />
        </svg>
      </a>
    </section>
  );
}
