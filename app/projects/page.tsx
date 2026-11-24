import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ProjectCard from "../components/project-card";
import ProjectsBackground from "../components/ProjectsBackground";
import { projects, site } from "../data";
import { ArrowLeft } from "../components/icons/arrows";

const title = `Projects | ${site.name}`;
const description = `Every project ${site.name} has worked on: mobile apps, web platforms and admin portals.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function AllProjects() {
  return (
    <>
      <Navbar />
      <main className="relative isolate overflow-hidden px-4 pb-24 sm:px-6 md:pb-32">
        <ProjectsBackground />
        <div className="mx-auto max-w-6xl">
          {/* Heading band with the 3D phones behind it */}
          <header className="fade-up pb-16 pt-28 md:min-h-[440px] md:pt-40">
            <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">{projects.length}</span> projects
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-fg sm:text-5xl md:text-6xl">All projects</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Everything I’ve worked on: mobile apps, web platforms and admin portals. Open a project to see what it does,
              the tech behind it and screenshots.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
