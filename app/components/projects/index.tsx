import Link from "next/link";
import { projects } from "../../data";
import ProjectCard from "../project-card";
import ProjectsBackground from "../ProjectsBackground";
import SectionHeading from "../section-heading";
import { ArrowRight } from "../icons/arrows";

// How many projects the home page shows before "View all projects".
const HOME_PROJECT_COUNT = 4;

export default function Projects() {
  return (
    <section id="projects" className="relative isolate overflow-hidden px-4 pb-24 sm:px-6 md:pb-32">
      <ProjectsBackground />
      <div className="reveal mx-auto max-w-6xl">
        {/* Heading band with the 3D phones behind it */}
        <div className="pb-16 pt-24 md:min-h-[440px] md:pt-40">
          <SectionHeading index="04" eyebrow="Projects" title="Selected work" />
          <p className="-mt-6 max-w-xl text-lg leading-relaxed text-muted md:-mt-8">
            Mobile apps and web platforms I’ve built. Open a project to see what it does, the tech behind it and screenshots.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {projects.slice(0, HOME_PROJECT_COUNT).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {projects.length > HOME_PROJECT_COUNT && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent-strong px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-strong/85"
            >
              View all {projects.length} projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
