import { experience } from "../../data";
import SectionHeading from "../section-heading";

export default function Experience() {
  return (
    <section id="experience" className="px-4 pb-24 sm:px-6 md:pb-32">
      <div className="reveal mx-auto max-w-6xl">
        <SectionHeading index="02" eyebrow="Experience" title="Where I’ve worked" />

        <ol className="relative space-y-6 border-l border-line pl-6 md:pl-10">
          {experience.map((job) => (
            <li key={job.company} className="relative">
              <span
                aria-hidden
                className="absolute -left-[29px] top-7 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-ink md:-left-[45px]"
              />
              <article className="rounded-3xl border border-line bg-surface p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-xl font-bold text-fg">{job.company}</h3>
                    <p className="mt-1 text-sm font-medium text-accent">{job.role}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    {job.location && <span>{job.location}</span>}
                    {job.ongoing && (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 leading-relaxed text-fg/85">{job.summary}</p>

                <ul className="mt-4 space-y-2">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-muted" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
