import Image from "next/image";
import type { Project } from "../../data";

// The project's cover screenshot, or a styled placeholder when there isn't one yet.
export default function ProjectCover({
  project,
  sizes,
  priority,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
}) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={`${project.name} screenshot`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div className="absolute inset-0 grid place-items-center bg-surface p-6">
      <div className="text-center">
        <span className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">{project.name}</span>
        {project.badge && <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">{project.badge}</p>}
      </div>
    </div>
  );
}
