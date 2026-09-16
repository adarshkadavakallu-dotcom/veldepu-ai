import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/site";
import { cn } from "@/lib/utils";

export type SitePath = "/" | "/services" | "/websites" | "/website-improvement" | "/automation" | "/process" | "/work" | "/about" | "/contact" | "/audit" | "/404";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase text-primary"><Sparkles className="size-3.5" />{children}</div>;
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
    {eyebrow && <p className="mb-3 text-xs font-semibold uppercase text-primary">{eyebrow}</p>}
    <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
    {description && <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>}
  </div>;
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <section className="page-hero overflow-hidden border-b border-border">
    <div className="site-container relative py-20 sm:py-24 lg:py-28">
      <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative max-w-3xl animate-rise">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display text-4xl font-semibold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  </section>;
}

export function ActionLink({ to, children, variant = "default" }: { to: SitePath; children: ReactNode; variant?: "default" | "outline" | "secondary" | "ghost" }) {
  return <Button asChild size="lg" variant={variant}><Link to={to}>{children}<ArrowRight /></Link></Button>;
}

export function CheckList({ items, compact = false }: { items: readonly string[]; compact?: boolean }) {
  return <ul className={cn("grid gap-3", !compact && "sm:grid-cols-2")}>
    {items.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-primary"><Check className="size-3" /></span>{item}</li>)}
  </ul>;
}

export function FAQSection({ items = faqs }: { items?: readonly { question: string; answer: string }[] }) {
  return <section className="section-space border-t border-border bg-surface-soft"><div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
    <SectionHeading eyebrow="FAQ" title="Questions, answered clearly." description="Straightforward answers before you decide what comes next." />
    <Accordion type="single" collapsible className="rounded-lg border border-border bg-card px-5 sm:px-7">
      {items.map((item, index) => <AccordionItem value={`item-${index}`} key={item.question}><AccordionTrigger className="py-5 text-base hover:no-underline">{item.question}</AccordionTrigger><AccordionContent className="pb-5 leading-7 text-muted-foreground">{item.answer}</AccordionContent></AccordionItem>)}
    </Accordion>
  </div></section>;
}

export function CTASection({ title = "Ready to build something better?", description = "Tell us what you want to improve. We’ll help you find the clearest next step.", cta = "Start a Project", to = "/contact" as SitePath }: { title?: string; description?: string; cta?: string; to?: SitePath }) {
  return <section className="section-space bg-foreground text-background"><div className="site-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"><div className="max-w-2xl"><p className="mb-3 text-xs font-semibold uppercase text-brand-soft">Next step</p><h2 className="font-display text-3xl font-semibold sm:text-5xl">{title}</h2><p className="mt-4 max-w-xl text-base leading-7 text-background/70">{description}</p></div><Button asChild size="lg" variant="light"><Link to={to}>{cta}<ArrowRight /></Link></Button></div></section>;
}

export function MetricBand({ items }: { items: readonly { title: string; text: string }[] }) {
  return <section className="border-y border-border bg-card"><div className="site-container grid sm:grid-cols-2 lg:grid-cols-4">{items.map((item) => <div key={item.title} className="border-b border-border py-7 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"><p className="font-display text-lg font-semibold">{item.title}</p><p className="mt-1 text-sm text-muted-foreground">{item.text}</p></div>)}</div></section>;
}
