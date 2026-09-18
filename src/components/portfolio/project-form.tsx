import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectCategories, type Project } from "@/lib/projects";

/**
 * Reusable project form for a future private admin dashboard.
 *
 * It is intentionally not routed on the public site. It collects the exact
 * shape of `Project` and hands it to `onSubmit`, so a future admin screen can
 * pass a persistence function without changing this component.
 */

export type ProjectDraft = Omit<Project, "id" | "createdAt" | "clientName" | "imageUrl" | "liveUrl" | "completedAt"> & {
  clientName?: string | undefined;
  imageUrl?: string | undefined;
  liveUrl?: string | undefined;
  completedAt?: string | undefined;
};
export type ProjectFormResult = { ok: true } | { ok: false; message: string };

type Errors = Record<string, string>;

const statuses = ["Client Project", "Demo Project", "Concept Project"] as const;

function list(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export function ProjectForm({ onSubmit, onCancel }: { onSubmit: (draft: ProjectDraft) => Promise<ProjectFormResult>; onCancel?: () => void }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (name: string) => String(data.get(name) ?? "").trim();

    const next: Errors = {};
    if (!get("title")) next["title"] = "Project title is required.";
    if (!get("category")) next["category"] = "Category is required.";
    if (!get("projectType")) next["projectType"] = "Project type is required.";
    if (get("description").length < 20) next["description"] = "Please add at least 20 characters.";
    if (get("fullDescription").length < 40) next["fullDescription"] = "Please add at least 40 characters.";
    if (!list(get("services")).length) next["services"] = "Add at least one service.";
    if (!list(get("technologies")).length) next["technologies"] = "Add at least one technology.";
    for (const field of ["imageUrl", "liveUrl"]) {
      const value = get(field);
      if (!value) continue;
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) throw new Error();
      } catch {
        next[field] = "Enter a full URL beginning with http:// or https://.";
      }
    }
    if (get("clientName") && !data.get("clientPermission")) next["clientPermission"] = "Confirm the client permitted publishing their details.";

    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) {
      setStatus("idle");
      requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus());
      return;
    }

    setStatus("loading");
    const permission = Boolean(data.get("clientPermission"));
    const draft: ProjectDraft = {
      title: get("title"),
      clientName: get("clientName") || undefined,
      clientPermission: permission,
      category: get("category") as Project["category"],
      description: get("description"),
      fullDescription: get("fullDescription"),
      problem: get("problem"),
      solution: get("solution"),
      services: list(get("services")),
      technologies: list(get("technologies")),
      imageUrl: get("imageUrl") || undefined,
      galleryImages: list(get("galleryImages")),
      liveUrl: get("liveUrl") || undefined,
      completedAt: get("completedAt") || undefined,
      featured: Boolean(data.get("featured")),
      published: Boolean(data.get("published")),
    };
    const result = await onSubmit(draft);
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setFormError(result.message);
    }
  };

  const field = (name: string, label: string, node: React.ReactNode, full = false) => (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold">{label}</label>
      {node}
      {errors[name] && <p id={`${name}-error`} role="alert" className="mt-2 text-xs font-medium text-destructive">{errors[name]}</p>}
    </div>
  );

  const input = (name: string, props: React.ComponentProps<typeof Input> = {}) => (
    <Input id={name} name={name} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} className="h-11" {...props} />
  );

  const select = (name: string, options: readonly string[], placeholder: string) => (
    <select id={name} name={name} defaultValue="" aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  );

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary/30 bg-accent p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-10 text-primary" />
        <h2 className="mt-5 font-display text-2xl font-semibold">Project details ready</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">The project details are prepared. Storage is not connected yet, so nothing has been stored permanently.</p>
        <Button className="mt-6" variant="outline" onClick={() => { setErrors({}); setStatus("idle"); }}>Add another project</Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} aria-label="Project details" className="grid gap-5 rounded-lg border border-border bg-card p-5 shadow-sm sm:grid-cols-2 sm:p-8">
      {field("title", "Project title", input("title", { placeholder: "Project name", maxLength: 120 }))}
      {field("clientName", "Client / business name", input("clientName", { placeholder: "Leave empty to publish anonymously", maxLength: 120 }))}
      {field("projectType", "Project type", select("projectType", statuses, "Select project type"))}
      {field("category", "Category", select("category", projectCategories, "Select category"))}
      {field("description", "Short description", <Textarea id="description" name="description" maxLength={400} className="min-h-24" aria-invalid={Boolean(errors["description"])} aria-describedby={errors["description"] ? "description-error" : undefined} />, true)}
      {field("fullDescription", "Full description", <Textarea id="fullDescription" name="fullDescription" maxLength={2000} className="min-h-32" aria-invalid={Boolean(errors["fullDescription"])} aria-describedby={errors["fullDescription"] ? "fullDescription-error" : undefined} />, true)}
      {field("problem", "Problem / requirement", <Textarea id="problem" name="problem" maxLength={800} className="min-h-24" />, true)}
      {field("solution", "Solution", <Textarea id="solution" name="solution" maxLength={800} className="min-h-24" />, true)}
      {field("services", "Services (comma separated)", input("services", { placeholder: "AI Website Creation, UX Review" }))}
      {field("technologies", "Technologies (comma separated)", input("technologies", { placeholder: "React, Responsive UI" }))}
      {field("imageUrl", "Main image URL", input("imageUrl", { type: "url", placeholder: "https://…" }))}
      {field("galleryImages", "Gallery image URLs (comma separated)", input("galleryImages", { placeholder: "https://…, https://…" }))}
      {field("liveUrl", "Live website URL", input("liveUrl", { type: "url", placeholder: "https://…" }))}
      {field("completedAt", "Completion date", input("completedAt", { type: "date" }))}

      <div className="space-y-3 sm:col-span-2">
        <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" name="featured" className="size-4 accent-primary" />Featured on the homepage</label>
        <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" name="published" defaultChecked className="size-4 accent-primary" />Published on the Work page</label>
        <label className="flex items-start gap-3 text-sm font-medium"><input type="checkbox" name="clientPermission" aria-invalid={Boolean(errors["clientPermission"])} className="mt-0.5 size-4 accent-primary" />The client has permitted publishing their name, images, and website</label>
        {errors["clientPermission"] && <p id="clientPermission-error" role="alert" className="text-xs font-medium text-destructive">{errors["clientPermission"]}</p>}
      </div>

      {status === "error" && formError && (
        <p role="alert" className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-xs font-medium text-destructive sm:col-span-2">
          <TriangleAlert className="size-4 shrink-0" />{formError}
        </p>
      )}

      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "loading"} aria-busy={status === "loading"}>
          {status === "loading" ? <><LoaderCircle className="animate-spin" />Saving…</> : "Save Project"}
        </Button>
        {onCancel && <Button type="button" size="lg" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}
