import { site } from "../../data";
import CvButton from "../cv-button";
import SectionHeading from "../section-heading";
import Socials from "../socials";

export default function Contact() {
  const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <section id="contact" className="px-4 pb-24 sm:px-6 md:pb-32">
      <div className="reveal mx-auto max-w-6xl rounded-[2rem] border border-line bg-surface px-6 py-16 sm:px-12 md:py-24">
        <SectionHeading index="05" eyebrow="Contact" title="Let’s build something together" />

        <p className="-mt-6 max-w-xl text-lg leading-relaxed text-muted md:-mt-8">
          Hiring for a mobile or web role, or have a project in mind? I’d love to hear about it. I’m based in{" "}
          {site.location}.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-accent-strong px-7 text-base font-semibold text-white transition-colors hover:bg-accent-strong/85"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            {site.email}
          </a>
          <a
            href={phoneHref}
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-fg/20 px-7 text-base font-semibold text-fg transition-colors hover:bg-fg/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
            </svg>
            {site.phone}
          </a>
          <CvButton className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-fg/20 px-7 text-base font-semibold text-fg transition-colors hover:bg-fg/10" />
        </div>

        <Socials className="mt-8" />
      </div>
    </section>
  );
}
