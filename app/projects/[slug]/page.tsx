import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "../../components/badge";
import Footer from "../../components/footer";
import { BrowserFrame, PhoneFrame } from "../../components/frames";
import { BrandIcon } from "../../components/icons/brands";
import LivePreview from "../../components/live-preview";
import Navbar from "../../components/navbar";
import ProjectCover from "../../components/project-cover";
import { getProject, projects, site, type ProjectLink, type ProjectScreen } from "../../data";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "../../components/icons/arrows";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const title = `${project.name} | ${site.name}`;
  const images = project.cover ? [project.cover] : undefined;
  return {
    title,
    description: project.summary,
    openGraph: { title, description: project.summary, images },
    twitter: { card: "summary_large_image", title, description: project.summary, images },
  };
}

function LinkButton({ link, primary }: { link: ProjectLink; primary: boolean }) {
  const icon =
    link.kind === "ios" ? (
      <BrandIcon brand="appstore" className="h-4 w-4" />
    ) : link.kind === "android" ? (
      <BrandIcon brand="googleplay" className="h-4 w-4" />
    ) : null;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
        primary ? "bg-accent-strong text-white hover:bg-accent-strong/85" : "border border-fg/20 text-fg hover:bg-fg/10"
      }`}
    >
      {icon}
      {link.label}
      {!icon && <ArrowUpRight className="h-4 w-4" />}
    </a>
  );
}

function StackGroup({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.15em] text-muted">{label}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full bg-fg/5 px-3 py-1 text-sm text-fg/90 ring-1 ring-line">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// One part of the product: title, description, live preview button and desktop + phone screenshots.
function ScreenBlock({
  project,
  screen,
  className,
  priority,
}: {
  project: string;
  screen: ProjectScreen;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={className}>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <h3 className="text-xl font-semibold text-fg">{screen.title}</h3>
          <p className="mt-2 text-muted">{screen.description}</p>
        </div>
        {screen.url && (
          <div className="flex flex-none items-center gap-2">
            {screen.livePreview && <LivePreview title={`${project} · ${screen.title}`} url={screen.url} />}
            <a
              href={screen.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-fg/20 px-5 text-sm font-semibold text-fg transition-colors hover:bg-fg/10"
            >
              Open site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>

      <div className={`grid items-end gap-6 ${screen.mobile ? "md:grid-cols-[1fr_220px]" : ""}`}>
        {screen.desktop && (
          <BrowserFrame url={screen.url}>
            <Image
              src={screen.desktop}
              alt={`${screen.title} on desktop`}
              fill
              priority={priority}
              sizes="(min-width: 1152px) 900px, 100vw"
              className="object-cover object-top"
            />
          </BrowserFrame>
        )}
        {screen.mobile && (
          <div className="mx-auto w-[180px] md:w-full">
            <PhoneFrame>
              <Image src={screen.mobile} alt={`${screen.title} on mobile`} fill sizes="220px" className="object-cover object-top" />
            </PhoneFrame>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  // Mobile app projects lead with the app; any website screens are listed further down.
  const mobileFirst = (project.mobileApps?.length ?? 0) > 0;
  const screens = project.screens ?? [];
  const featured = mobileFirst ? undefined : screens[0];
  const moreScreens = mobileFirst ? screens : screens.slice(1);

  return (
    <>
      <Navbar />
      <main className="px-4 pb-24 pt-28 sm:px-6 md:pt-32">
        <article className="mx-auto max-w-6xl">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>

          {/* Header */}
          <header className="fade-up mt-8 max-w-3xl">
            <div className="flex items-center gap-3">
              {project.icon && (
                <Image src={project.icon} alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
              )}
              <p className="text-xs uppercase tracking-[0.15em] text-muted">{project.category}</p>
              {project.badge && <Badge>{project.badge}</Badge>}
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-fg sm:text-5xl md:text-6xl">{project.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">{project.summary}</p>

            {(project.company || project.contributors) && (
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                {project.company && (
                  <div className="flex gap-2">
                    <dt className="text-muted">Company</dt>
                    <dd className="text-fg">{project.company}</dd>
                  </div>
                )}
                {project.contributors && (
                  <div className="flex gap-2">
                    <dt className="text-muted">Team</dt>
                    <dd className="text-fg">{project.contributors.join(", ")}</dd>
                  </div>
                )}
              </dl>
            )}

            {project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((link, i) => (
                  <LinkButton key={link.url} link={link} primary={i === 0} />
                ))}
              </div>
            )}
          </header>

          {/* Main screen, or the cover (or a placeholder) for projects without website screenshots */}
          <div className="fade-up mt-14" style={{ animationDelay: "150ms" }}>
            {featured ? (
              <ScreenBlock project={project.name} screen={featured} priority />
            ) : (
              <div
                className={`relative overflow-hidden rounded-3xl border border-line ${project.cover ? "aspect-[16/10]" : "aspect-[16/9] md:aspect-[16/6]"}`}
              >
                <ProjectCover project={project} sizes="(min-width: 1152px) 1152px, 100vw" priority />
              </div>
            )}
          </div>

          {/* Overview + stack */}
          <div className="mt-20 grid gap-12 md:grid-cols-[1fr_320px] md:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-fg md:text-3xl">Overview</h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
                {project.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <h2 className="mt-14 text-2xl font-bold text-fg md:text-3xl">What it does</h2>
              <ul className="mt-6 space-y-4">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-base leading-relaxed text-fg/85">
                    <svg
                      className="mt-1 h-5 w-5 flex-none text-accent"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M5 10.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="h-fit space-y-8 rounded-3xl border border-line bg-surface p-6 md:sticky md:top-24">
              <h2 className="text-lg font-bold text-fg">Tech stack</h2>
              <StackGroup label="Framework" items={project.stack.frameworks} />
              <StackGroup label="Libraries" items={project.stack.libraries} />
              <StackGroup label="Technologies" items={project.stack.technologies} />
            </aside>
          </div>

          {/* Native mobile apps */}
          {project.mobileApps?.map((app) => (
            <section key={app.title} className="reveal mt-24">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-bold text-fg md:text-3xl">{app.title}</h2>
                  <p className="mt-2 text-muted">{app.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {app.links.map((link) => (
                    <LinkButton key={link.url} link={link} primary={false} />
                  ))}
                </div>
              </div>
              <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
                {app.screens.map((src, i) => (
                  <li key={src} className="w-[200px] flex-none snap-start md:w-[220px]">
                    <Image
                      src={src}
                      alt={`${project.name} ${app.title} screen ${i + 1}`}
                      width={600}
                      height={1300}
                      sizes="220px"
                      className="h-auto w-full rounded-[1.6rem] border border-fg/10 bg-surface"
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Other screens */}
          {moreScreens.length > 0 && (
            <section className="mt-24">
              <h2 className="text-2xl font-bold text-fg md:text-3xl">{mobileFirst ? "Website" : "More screens"}</h2>
              <div className="mt-10 space-y-20">
                {moreScreens.map((screen) => (
                  <ScreenBlock key={screen.title} project={project.name} screen={screen} className="reveal" />
                ))}
              </div>
            </section>
          )}

          {/* Next project */}
          {next !== project && (
            <Link
              href={`/projects/${next.slug}`}
              className="group mt-24 flex items-center justify-between gap-6 rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-fg/20 md:p-10"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-muted">Next project</p>
                <p className="mt-2 text-2xl font-bold text-fg md:text-4xl">{next.name}</p>
              </div>
              <ArrowRight className="h-8 w-8 flex-none text-fg transition-transform duration-300 group-hover:translate-x-2 md:h-12 md:w-12" />
            </Link>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
