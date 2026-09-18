import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectDetails } from "@/components/portfolio/project-details";
import { CTASection } from "@/components/site/site-ui";
import { projectQueries } from "@/lib/projects";

export const Route = createFileRoute("/work/$projectId")({
  loader: async ({ context, params }) => {
    const result = await context.queryClient.ensureQueryData(projectQueries.byId(params.projectId));
    if (!result.ok) throw new Error(result.message);
    if (!result.data) throw notFound();
    return { project: result.data };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project unavailable — Veldepu AI" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.title} — Work — Veldepu AI`;
    return {
      meta: [
        { title },
        { name: "description", content: project.description },
        { property: "og:title", content: title },
        { property: "og:description", content: project.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: Page,
});

function Page() {
  const { project } = Route.useLoaderData();
  return (
    <>
      <ProjectDetails project={project} />
      <CTASection />
    </>
  );
}

function ProjectNotFound() {
  return (
    <section className="section-space">
      <div className="site-container max-w-xl text-center">
        <h1 className="font-display text-4xl font-semibold">Project not found.</h1>
        <p className="mt-4 text-muted-foreground">This project may have been moved or is not published yet.</p>
        <Button asChild className="mt-8"><Link to="/work"><ArrowLeft />Back to Work</Link></Button>
      </div>
    </section>
  );
}
