import Image from "next/image";
import Link from "next/link";
import type { Project } from "../../data";
import Badge from "../badge";
import ProjectCover from "../project-cover";
import { ArrowRight } from "../icons/arrows";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-fg/20 hover:shadow-[0_30px_60px_-30px_rgb(59_130_246/0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <ProjectCover project={project} sizes="(min-width: 768px) 560px, 100vw" />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-center gap-3">
          {project.icon && <Image src={project.icon} alt="" width={32} height={32} className="h-8 w-8 rounded-lg" />}
          <p className="text-xs uppercase tracking-[0.15em] text-muted">{project.category}</p>
          {project.badge && <Badge>{project.badge}</Badge>}
        </div>
        <h3 className="mt-3 text-2xl font-bold text-fg">{project.name}</h3>
        <p className="mt-3 text-base leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
          {[...project.stack.frameworks, ...project.stack.libraries, ...project.stack.technologies].slice(0, 5).map((tool) => (
            <li key={tool} className="rounded-full bg-fg/5 px-3 py-1 text-xs text-fg/85 ring-1 ring-line">
              {tool}
            </li>
          ))}
        </ul>

        <p className="mt-auto flex items-center gap-1.5 pt-8 text-sm font-semibold text-fg">
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  );
}
