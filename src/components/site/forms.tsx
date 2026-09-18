import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, RotateCcw, TriangleAlert } from "lucide-react";
import { buildEnquiryPayload, submitEnquiry } from "@/lib/enquiries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Errors = Record<string, string>;
type Field = { name: string; label: string; type?: string; required?: boolean; placeholder?: string; options?: readonly string[]; full?: boolean; minLength?: number };

const services = ["AI Website Creation", "Website Improvement / Redesign", "AI Business Automation"];
const budgets = ["Under ₹5,000", "₹5,000–₹15,000", "₹15,000–₹30,000", "₹30,000–₹50,000", "₹50,000+", "Not Sure"];
const contactMethods = ["Email", "Phone", "WhatsApp"];

const contactFields: Field[] = [
 { name:"name", label:"Name", required:true, placeholder:"Your name" }, { name:"businessName", label:"Business Name", required:true, placeholder:"Business or company name" },
 { name:"email", label:"Email", type:"email", required:true, placeholder:"you@company.com" }, { name:"phone", label:"Phone", type:"tel", placeholder:"Your phone number" },
 { name:"whatsapp", label:"WhatsApp", type:"tel", placeholder:"Your WhatsApp number" }, { name:"websiteUrl", label:"Website URL", type:"url", placeholder:"https://example.com" },
 { name:"businessType", label:"Business Type", required:true, placeholder:"e.g. Retail, consulting, healthcare" }, { name:"service", label:"Service", required:true, options:services },
 { name:"projectDescription", label:"Project Description", required:true, placeholder:"What would you like to build or improve?", full:true, minLength:20 },
 { name:"budget", label:"Budget", required:true, options:budgets }, { name:"preferredContact", label:"Preferred Contact", required:true, options:contactMethods },
];
const auditFields: Field[] = [
 { name:"name", label:"Name", required:true, placeholder:"Your name" }, { name:"businessName", label:"Business Name", required:true, placeholder:"Business or company name" },
 { name:"email", label:"Email", type:"email", required:true, placeholder:"you@company.com" }, { name:"websiteUrl", label:"Website URL", type:"url", required:true, placeholder:"https://example.com" },
 { name:"improvements", label:"What would you like improved?", required:true, placeholder:"Tell us what feels unclear, outdated, or difficult today.", full:true, minLength:15 },
 { name:"mainGoal", label:"Main Goal", required:true, placeholder:"e.g. More inquiries or a better mobile experience", full:true }, { name:"budget", label:"Budget", required:true, options:budgets }, { name:"preferredContact", label:"Preferred Contact", required:true, options:contactMethods },
];

export function ProjectForm({ kind = "contact" }: { kind?: "contact" | "audit" }) {
 const fields = kind === "contact" ? contactFields : auditFields;
 const [errors, setErrors] = useState<Errors>({}); const [status, setStatus] = useState<"idle"|"loading"|"success">("idle");
 const validate = (form: HTMLFormElement) => { const data = new FormData(form); const next: Errors = {}; fields.forEach((field) => { const value = String(data.get(field.name) ?? "").trim(); if(field.required && !value) next[field.name] = `${field.label} is required.`; else if(field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) next[field.name] = "Enter a valid email address."; else if(field.type === "url" && value) { try { const url = new URL(value); if(!["http:","https:"].includes(url.protocol)) throw new Error(); } catch { next[field.name] = "Enter a full URL beginning with http:// or https://."; } } else if(field.minLength && value.length < field.minLength) next[field.name] = `Please add at least ${field.minLength} characters.`; }); return next; };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = event.currentTarget; const next = validate(form); setErrors(next); if(Object.keys(next).length) { requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()); return; } setStatus("loading"); window.setTimeout(() => { setStatus("success"); form.reset(); }, 750); };
  if(status === "success") return <div className="rounded-lg border border-primary/30 bg-accent p-8 text-center" role="status"><CheckCircle2 className="mx-auto size-10 text-primary"/><h2 className="mt-5 font-display text-2xl font-semibold">Thanks!</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">Your {kind === "audit" ? "website review" : "project"} request has been received. We'll review the details and follow up with you shortly.</p><Button className="mt-6" variant="outline" onClick={() => { setErrors({}); setStatus("idle"); }}><RotateCcw />Send another request</Button></div>;
  return <form noValidate onSubmit={submit} className="grid gap-5 rounded-lg border border-border bg-card p-5 shadow-sm sm:grid-cols-2 sm:p-8" aria-label={kind === "audit" ? "Website review request" : "Project inquiry"}>
  {fields.map((field) => <div key={field.name} className={field.full ? "sm:col-span-2" : ""}><label htmlFor={field.name} className="mb-2 block text-sm font-semibold">{field.label}{field.required && <span className="text-primary" aria-hidden="true"> *</span>}</label>{field.options ? <select id={field.name} name={field.name} defaultValue="" aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"><option value="" disabled>Select {field.label.toLowerCase()}</option>{field.options.map((option)=><option value={option} key={option}>{option}</option>)}</select> : field.full ? <Textarea id={field.name} name={field.name} placeholder={field.placeholder} maxLength={1200} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} className="min-h-32"/> : <Input id={field.name} name={field.name} type={field.type ?? "text"} placeholder={field.placeholder} maxLength={160} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} className="h-11"/>}{errors[field.name] && <p id={`${field.name}-error`} role="alert" className="mt-2 text-xs font-medium text-destructive">{errors[field.name]}</p>}</div>)}
  <div className="sm:col-span-2"><Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">{status === "loading" ? <><LoaderCircle className="animate-spin"/>Sending request…</> : kind === "audit" ? "Request Website Review" : "Send Project Request"}</Button></div>
 </form>;
}
