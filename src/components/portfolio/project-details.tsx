import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCompletion, projectClientLabel, projectStatus, type Project } from "@/lib/projects";
import { ProjectCover } from "./project-card";

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <div className="mt-3 text-sm leading-7 text-muted-foreground">{children}</div>
    </div>
  );
}

export function ProjectDetails({ project }: { project: Project }) {
  const client = projectClientLabel(project);
  const completed = formatCompletion(project.completedAt);
  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="site-container py-14 sm:py-16">
          <Button asChild variant="ghost" className="-ml-3">
            <Link to="/work"><ArrowLeft />Back to Work</Link>
          </Button>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{project.category}</span>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">{projectStatus(project)}</span>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">{project.title}</h1>
          {client ? (
            <p className="mt-4 text-base font-medium text-muted-foreground">{client}</p>
          ) : (
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">Presented without client identification.</p>
          )}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{project.description}</p>
          {project.liveUrl && (
            <Button asChild size="lg" className="mt-8">
              <a href={project.liveUrl} target="_blank" rel="noreferrer noopener">Live Website<ExternalLink /></a>
            </Button>
          )}
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          <div className="space-y-10">
            <div className="aspect-[16/10] overflow-hidden rounded-lg border border-border">
              <ProjectCover project={project} priority />
            </div>
            <DetailBlock title="Overview"><p>{project.fullDescription}</p></DetailBlock>
            <DetailBlock title="Problem / requirement"><p>{project.problem}</p></DetailBlock>
            <DetailBlock title="Solution"><p>{project.solution}</p></DetailBlock>
            {project.galleryImages.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold">Screenshots</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {project.galleryImages.map((src, index) => (
                    <img key={src} src={src} alt={`${project.title} screenshot ${index + 1}`} loading="lazy" decoding="async" className="w-full rounded-lg border border-border object-cover" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6 rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Services provided</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {project.services.map((service) => <li key={service}>{service}</li>)}
              </ul>
            </div>
            <div className="border-t border-border pt-5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Technologies</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => <span key={tech} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{tech}</span>)}
              </div>
            </div>
            {completed && (
              <div className="border-t border-border pt-5">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Completed</h2>
                <p className="mt-2 text-sm">{completed}</p>
              </div>
            )}
            <div className="border-t border-border pt-5">
              <Button asChild className="w-full">
                <Link to="/contact">Start a Project<ArrowRight /></Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
