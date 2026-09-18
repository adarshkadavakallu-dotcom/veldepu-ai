import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCompletion, projectClientLabel, projectStatus, type Project } from "@/lib/projects";

export function ProjectCover({ project, index = 0, priority = false }: { project: Project; index?: number; priority?: boolean }) {
  if (project.imageUrl) {
    return (
      <img
        src={project.imageUrl}
        alt={`${project.title} — ${project.category} project preview`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    );
  }
  return (
    <div className="relative size-full bg-foreground p-6" aria-hidden="true">
      <div className="hero-grid absolute inset-0 opacity-20" />
      <div className="relative flex h-full flex-col justify-between rounded-md border border-background/20 bg-background/5 p-4">
        <span className="w-fit rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground">{projectStatus(project)}</span>
        <span className="font-display text-5xl font-semibold text-background/30">{String(index + 1).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index = 0, priority = false }: { project: Project; index?: number; priority?: boolean }) {
  const client = projectClientLabel(project);
  const completed = formatCompletion(project.completedAt);
  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="aspect-[16/10] overflow-hidden">
        <ProjectCover project={project} index={index} priority={priority} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{project.category}</span>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">{projectStatus(project)}</span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold">{project.title}</h3>
        {client && <p className="mt-1 text-sm font-medium text-muted-foreground">{client}</p>}
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{project.description}</p>
        <dl className="mt-5 space-y-3 text-xs">
          <div>
            <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Services</dt>
            <dd className="mt-1 text-sm text-foreground">{project.services.join(" · ")}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Technologies</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full bg-surface-soft px-3 py-1 text-xs font-medium text-muted-foreground">{tech}</span>
              ))}
            </dd>
          </div>
          {completed && (
            <div>
              <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Completed</dt>
              <dd className="mt-1 text-sm text-foreground">{completed}</dd>
            </div>
          )}
        </dl>
        <Button asChild variant="outline" className="mt-6 w-full">
          <Link to="/work/$projectId" params={{ projectId: project.id }}>
            View Details<ArrowUpRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}
