import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/site-ui";
import { projectQueries } from "@/lib/projects";
import { ProjectGrid, ProjectGridSkeleton, ProjectsErrorState } from "./project-grid";

/** Homepage "Selected Work". Hides itself cleanly when nothing is featured. */
export function FeaturedProjects({ limit = 3 }: { limit?: number }) {
  const { data, isPending, refetch } = useQuery(projectQueries.featured(limit));

  if (isPending) {
    return (
      <section className="section-space border-t border-border bg-surface-soft">
        <div className="site-container"><ProjectGridSkeleton count={limit} /></div>
      </section>
    );
  }
  if (!data) return null;
  if (!data.ok) {
    return (
      <section className="section-space border-t border-border bg-surface-soft">
        <div className="site-container"><ProjectsErrorState message={data.message} onRetry={() => void refetch()} /></div>
      </section>
    );
  }
  if (data.data.length === 0) return null;

  return (
    <section className="section-space border-t border-border bg-surface-soft">
      <div className="site-container">
        <SectionHeading eyebrow="Selected work" title="Thinking made visible." description="A short selection of our work. Concept and sample projects are labelled as such." />
        <div className="mt-10"><ProjectGrid projects={data.data} /></div>
        <Button asChild variant="outline" className="mt-8">
          <Link to="/work">View All Work<ArrowRight /></Link>
        </Button>
      </div>
    </section>
  );
}
