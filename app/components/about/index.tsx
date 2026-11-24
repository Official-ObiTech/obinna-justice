import Image from "next/image";
import { about, facts, site } from "../../data";
import CvButton from "../cv-button";
import SectionHeading from "../section-heading";

export default function About() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 md:py-32">
      <div className="reveal mx-auto max-w-6xl">
        <SectionHeading index="01" eyebrow="About" title="A little about me" />

        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <div className="mx-auto w-full max-w-[280px] md:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-accent/30 bg-accent/10">
              {site.photo ? (
                <Image src={site.photo} alt={site.name} fill sizes="320px" className="object-cover" />
              ) : (
                <div className="grid h-full place-items-center">
                  <span className="text-8xl font-bold tracking-tighter text-accent">{site.initials}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="space-y-5 text-lg leading-relaxed text-muted md:text-xl">
              {about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-ink p-5">
                  <dt className="text-xs font-medium uppercase tracking-[0.15em] text-muted">{fact.label}</dt>
                  <dd className="mt-2 text-sm font-medium text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <CvButton className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-accent-strong px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-strong/85" />
          </div>
        </div>
      </div>
    </section>
  );
}
