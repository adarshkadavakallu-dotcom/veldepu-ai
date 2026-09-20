import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LayoutGrid, MessageSquare, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { useSessionUser } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Veldepu AI" },
      { name: "description", content: "Your Veldepu AI account dashboard." },
      { property: "og:title", content: "Dashboard — Veldepu AI" },
      { property: "og:description", content: "Your Veldepu AI account dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useSessionUser();
  const name = (user?.user_metadata?.["full_name"] as string | undefined) ?? user?.email ?? "there";

  return (
    <section className="section-space">
      <div className="site-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-primary">Dashboard</p>
            <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Welcome, {name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              This is your account area. Start a new project request or review the work we publish.
            </p>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          <DashboardCard icon={MessageSquare} title="Start a project" text="Share your goals and requirements." to="/contact" cta="Open project form" />
          <DashboardCard icon={LayoutGrid} title="Our work" text="See recent websites and automation work." to="/work" cta="View work" />
          <DashboardCard icon={Workflow} title="Website review" text="Request a review of your current website." to="/audit" cta="Request review" />
        </div>
      </div>
    </section>
  );
}

function DashboardCard({
  icon: Icon,
  title,
  text,
  to,
  cta,
}: {
  icon: typeof LayoutGrid;
  title: string;
  text: string;
  to: "/contact" | "/work" | "/audit";
  cta: string;
}) {
  return (
    <article className="bg-card p-6">
      <Icon className="size-5 text-primary" />
      <h2 className="mt-4 font-display text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      <Button asChild variant="outline" className="mt-5">
        <Link to={to}>{cta}<ArrowRight /></Link>
      </Button>
    </article>
  );
}
