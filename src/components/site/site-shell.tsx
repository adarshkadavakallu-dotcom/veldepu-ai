import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { navItems } from "@/data/site";
import { useSessionUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { SitePath } from "./site-ui";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useSessionUser();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
    <div className="site-container flex h-18 items-center justify-between gap-6">
      <Link to="/" className="group inline-flex items-center gap-2 font-display text-lg font-bold" aria-label="Veldepu AI home"><span className="inline-flex size-8 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground transition-transform group-hover:rotate-3">V</span>VELDEPU <span className="text-primary">AI</span></Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">{navItems.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className="rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" activeProps={{ className: "bg-accent text-foreground" }}>{item.label}</Link>)}</nav>
      <div className="hidden items-center gap-2 xl:flex">
        {user ? <>
          <Button asChild variant="ghost"><Link to="/dashboard">Dashboard</Link></Button>
          <SignOutButton variant="ghost" />
        </> : <Button asChild variant="ghost"><Link to="/login">Sign In</Link></Button>}
        <Button asChild><Link to="/contact">Start a Project<ArrowUpRight /></Link></Button>
      </div>
      <Button variant="ghost" size="icon-lg" className="xl:hidden" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><Menu /></Button>
    </div>
    <div className={cn("fixed inset-0 z-50 bg-overlay transition-opacity duration-200 xl:hidden", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")} onClick={() => setOpen(false)} aria-hidden="true" />
    <aside id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!open} className={cn("fixed right-0 top-0 z-50 h-dvh w-[min(90vw,390px)] flex-col border-l border-border bg-background p-5 shadow-2xl transition-transform duration-300 xl:hidden", open ? "flex translate-x-0" : "hidden translate-x-full")}>
      <div className="flex items-center justify-between"><span className="font-display text-lg font-bold">VELDEPU <span className="text-primary">AI</span></span><Button variant="ghost" size="icon-lg" aria-label="Close navigation menu" onClick={() => setOpen(false)}><X /></Button></div>
      <nav className="mt-8 flex flex-1 flex-col gap-1">{navItems.map((item) => <Link key={item.to} to={item.to} tabIndex={open ? 0 : -1} activeOptions={{ exact: item.to === "/" }} onClick={() => setOpen(false)} className="rounded-md px-4 py-3 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground" activeProps={{ className: "bg-accent text-foreground" }}>{item.label}</Link>)}</nav>
      <div className="grid gap-2">
        {user ? <>
          <Button asChild size="lg" variant="outline" className="w-full"><Link to="/dashboard" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>Dashboard</Link></Button>
          <SignOutButton />
        </> : <Button asChild size="lg" variant="outline" className="w-full"><Link to="/login" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>Sign In</Link></Button>}
        <Button asChild size="lg" className="w-full"><Link to="/contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>Start a Project<ArrowUpRight /></Link></Button>
      </div>
    </aside>
  </header>;
}

export function SiteFooter() {
  const serviceLinks = navItems.filter((item) => ["/services", "/websites", "/website-improvement", "/automation"].includes(item.to));
  const companyLinks = navItems.filter((item) => ["/process", "/work", "/about", "/contact"].includes(item.to));
  return <footer className="border-t border-border bg-surface-soft"><div className="site-container py-14"><div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
    <div><Link to="/" className="font-display text-xl font-bold">VELDEPU <span className="text-primary">AI</span></Link><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">Better websites. Smarter automation.</p></div>
    <FooterColumn title="Services" items={serviceLinks} />
    <FooterColumn title="Company" items={companyLinks} />
    <div><h2 className="text-sm font-semibold">Start here</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">Have a website or workflow in mind?</p><Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Start a Project<ArrowUpRight className="size-4" /></Link></div>
  </div><div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Veldepu AI. All rights reserved.</p><p>Better websites. Smarter automation.</p></div></div></footer>;
}

function FooterColumn({ title, items }: { title: string; items: readonly { label: string; to: SitePath }[] }) {
  return <div><h2 className="text-sm font-semibold">{title}</h2><ul className="mt-4 space-y-3">{items.map((item) => <li key={item.to}><Link to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">{item.label}</Link></li>)}</ul></div>;
}
