import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/auth/auth-card";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — Veldepu AI" },
      { name: "description", content: "Create a Veldepu AI account to track your website and automation projects." },
      { property: "og:title", content: "Create Account — Veldepu AI" },
      { property: "og:description", content: "Create your Veldepu AI account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <section className="page-hero border-b border-border">
      <div className="site-container py-20 sm:py-24">
        <div className="mx-auto w-full max-w-md">
          <p className="mb-3 text-xs font-semibold uppercase text-primary">Get started</p>
          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">Create your account</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Set up an account to follow your projects in one place.
          </p>
          <div className="mt-8"><AuthCard mode="signup" /></div>
        </div>
      </div>
    </section>
  );
}
