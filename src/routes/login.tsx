import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/auth/auth-card";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Veldepu AI" },
      { name: "description", content: "Sign in to your Veldepu AI account to access your dashboard." },
      { property: "og:title", content: "Sign In — Veldepu AI" },
      { property: "og:description", content: "Access your Veldepu AI account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <section className="page-hero border-b border-border">
      <div className="site-container py-20 sm:py-24">
        <div className="mx-auto w-full max-w-md">
          <p className="mb-3 text-xs font-semibold uppercase text-primary">Account access</p>
          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">Sign in</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Welcome back. Sign in to continue to your dashboard.
          </p>
          <div className="mt-8"><AuthCard mode="login" /></div>
        </div>
      </div>
    </section>
  );
}
