import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, MoveRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { services, processSteps } from "@/data/site";
import { CheckList, SectionHeading } from "./site-ui";

export function ServicesGrid() {
  return <div className="grid gap-5 lg:grid-cols-3">{services.map((service, index) => { const Icon = service.icon; return <article key={service.title} className="group flex min-h-full flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:p-8"><div className="flex items-center justify-between"><span className="inline-flex size-11 items-center justify-center rounded-md bg-accent text-primary"><Icon className="size-5" /></span><span className="font-display text-sm text-muted-foreground">0{index + 1}</span></div><h3 className="mt-7 font-display text-2xl font-semibold">{service.title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{service.description}</p><div className="my-6 border-t border-border" /><CheckList items={service.features} compact /><Button asChild variant="outline" className="mt-8 w-full"><Link to={service.to}>{service.cta}<ArrowRight /></Link></Button></article>; })}</div>;
}

export function ProcessTimeline({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? "grid gap-4 md:grid-cols-5" : "grid gap-4"}>{processSteps.map((step, index) => <article key={step.number} className={compact ? "rounded-lg border border-border bg-card p-5" : "grid gap-4 border-t border-border py-7 sm:grid-cols-[5rem_12rem_1fr] sm:items-center"}><span className="font-display text-sm font-semibold text-primary">{step.number}</span><h3 className="font-display text-xl font-semibold">{step.title}</h3><p className="text-sm leading-6 text-muted-foreground">{step.text}</p>{!compact && index < processSteps.length - 1 && <MoveRight className="hidden" />}</article>)}</div>;
}

export function SplitSection({ eyebrow, title, description, items, visual, reverse = false }: { eyebrow: string; title: string; description: string; items?: readonly string[]; visual: ReactNode; reverse?: boolean }) {
  return <section className="section-space"><div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20"><div className={reverse ? "lg:order-2" : ""}><SectionHeading eyebrow={eyebrow} title={title} description={description} />{items && <div className="mt-8"><CheckList items={items} /></div>}</div><div className={reverse ? "lg:order-1" : ""}>{visual}</div></div></section>;
}

export function InterfaceVisual() {
  return <div className="relative mx-auto aspect-[4/3] max-w-xl rounded-lg border border-border bg-foreground p-4 shadow-2xl"><div className="flex h-full flex-col overflow-hidden rounded-md bg-background"><div className="flex h-10 items-center gap-2 border-b border-border px-4"><span className="size-2 rounded-full bg-primary"/><span className="size-2 rounded-full bg-border"/><span className="size-2 rounded-full bg-border"/><span className="ml-3 h-2 w-24 rounded-full bg-muted"/></div><div className="grid flex-1 grid-cols-[30%_1fr]"><div className="border-r border-border bg-surface-soft p-4"><div className="h-3 w-16 rounded-full bg-primary/30"/><div className="mt-6 space-y-3">{[1,2,3,4].map((x)=><div key={x} className="h-2 rounded-full bg-border"/>)}</div></div><div className="p-5 sm:p-8"><div className="h-3 w-16 rounded-full bg-primary"/><div className="mt-4 h-8 w-3/4 rounded bg-foreground"/><div className="mt-3 h-2 w-full rounded bg-border"/><div className="mt-2 h-2 w-2/3 rounded bg-border"/><div className="mt-8 grid grid-cols-2 gap-3"><div className="h-20 rounded-md bg-accent"/><div className="h-20 rounded-md border border-border"/></div></div></div></div></div>;
}

export function FeatureGrid({ items }: { items: readonly { title: string; text: string }[] }) {
 return <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{items.map((item)=><div key={item.title} className="bg-card p-6 sm:p-8"><span className="mb-5 inline-flex size-8 items-center justify-center rounded-full bg-accent text-primary"><Check className="size-4" /></span><h3 className="font-display text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></div>)}</div>;
}
