import Image from "next/image";
import { skillGroups, skills, skillsIntro, type Skill } from "../../data";
import SectionHeading from "../section-heading";

function SkillCard({ name, image, invertInLight }: Skill) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border border-fg/10 bg-surface-2 p-3 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)] light:shadow-[0_16px_36px_-20px_rgb(15_23_42/0.3)]">
      <Image
        src={image}
        alt=""
        width={96}
        height={96}
        className={`h-11 w-11 object-contain md:h-16 md:w-16 ${invertInLight ? "light:invert" : ""}`}
      />
      <span className="text-center text-xs font-semibold text-fg md:text-sm">{name}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="overflow-hidden border-y border-line bg-surface px-4 py-24 sm:px-6 md:py-32">
      <div className="reveal mx-auto max-w-6xl">
        <SectionHeading index="03" eyebrow="Skills" title="Tools I build with" />

        {/* 3D rotating carousel (hover to pause) */}
        <div className="carousel motion-reduce:hidden" aria-hidden>
          <div className="carousel-ring" style={{ "--total": skills.length } as React.CSSProperties}>
            {skills.map((skill, index) => (
              <div key={skill.name} className="carousel-item" style={{ "--i": index } as React.CSSProperties}>
                <div className="carousel-face">
                  <SkillCard {...skill} />
                </div>
                <div className="carousel-face carousel-face-back">
                  <SkillCard {...skill} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plain grid for screen readers and people who prefer reduced motion */}
        <ul className="sr-only grid-cols-3 gap-3 motion-reduce:not-sr-only motion-reduce:grid sm:grid-cols-5">
          {skills.map((skill) => (
            <li key={skill.name} className="h-32">
              <SkillCard {...skill} />
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-muted md:text-lg">
          {skillsIntro}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-line bg-ink/60 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-fg/5 px-3 py-1 text-xs text-fg/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
