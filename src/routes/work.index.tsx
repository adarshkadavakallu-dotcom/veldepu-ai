import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { CTASection, PageHero, SectionHeading } from "@/components/site/site-ui";
import { ProjectFilters } from "@/components/portfolio/project-filters";
import { ProjectGrid, ProjectGridSkeleton, ProjectsEmptyState, ProjectsErrorState } from "@/components/portfolio/project-grid";
import { projectCategories, projectQueries, type ProjectCategory } from "@/lib/projects";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Veldepu AI" },
      { name: "description", content: "Explore Veldepu AI concept and sample work across websites, redesign, and automation." },
      { property: "og:title", content: "Work — Veldepu AI" },
      { property: "og:description", content: "Concept and sample work showing how Veldepu AI approaches digital problems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectQueries.all()),
  component: Page,
});

function Page() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const { data, isPending, refetch } = useQuery(projectQueries.all());

  const all = data?.ok ? data.data : [];
  const usedCategories = useMemo(() => projectCategories.filter((category) => all.some((project) => project.category === category)), [all]);
  const showFilters = all.length >= 4 && usedCategories.length >= 2;
  const visible = useMemo(() => (active === "All" ? all : all.filter((project) => project.category === active)), [all, active]);

  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Ideas shaped into clear digital experiences."
        description="This collection shows exploratory concept and sample work. It reflects how we think without presenting examples as real client engagements."
      />
      <section className="section-space">
        <div className="site-container">
          <SectionHeading eyebrow="Portfolio" title="Built to show the approach." description="Open any project to see its problem, solution, services, and technologies." />

          {showFilters && (
            <div className="mt-8">
              <ProjectFilters categories={usedCategories} active={active} onChange={setActive} />
            </div>
          )}

          <div className="mt-10">
            {isPending && <ProjectGridSkeleton />}
            {!isPending && data && !data.ok && <ProjectsErrorState message={data.message} onRetry={() => void refetch()} />}
            {!isPending && data?.ok && visible.length > 0 && <ProjectGrid projects={visible} />}
            {!isPending && data?.ok && visible.length === 0 && (
              active === "All"
                ? <ProjectsEmptyState />
                : <ProjectsEmptyState title="No projects in this category yet." description="Choose another category to see more of our work." action={false} />
            )}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
