import { Link } from "@tanstack/react-router";
import { ArrowRight, FolderOpen, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./project-card";

export function ProjectGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-lg border border-border bg-card p-6">
          <Skeleton className="aspect-[16/10] w-full rounded-md" />
          <Skeleton className="mt-5 h-6 w-2/3" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
}

export function ProjectsEmptyState({ title = "We're building something great.", description = "New projects will appear here soon.", action = true }: { title?: string; description?: string; action?: boolean }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface-soft p-10 text-center" role="status">
      <FolderOpen className="mx-auto size-8 text-primary" />
      <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {action && (
        <Button asChild variant="outline" className="mt-6">
          <Link to="/contact">Start a Project<ArrowRight /></Link>
        </Button>
      )}
    </div>
  );
}

export function ProjectsErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-10 text-center" role="alert">
      <TriangleAlert className="mx-auto size-8 text-destructive" />
      <p className="mx-auto mt-5 max-w-md text-sm font-medium leading-6 text-destructive">{message}</p>
      {onRetry && (
        <Button variant="outline" className="mt-6" onClick={onRetry}>Try again</Button>
      )}
    </div>
  );
}

export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} priority={index === 0} />
      ))}
    </div>
  );
}
