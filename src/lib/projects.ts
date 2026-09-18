/**
 * Project data layer.
 *
 * The Work page and homepage only talk to `getProjects`, `getProjectById` and
 * `getFeaturedProjects`. Today these resolve from local static data; later the
 * same three functions can read from a `projects` table (Frontend -> data layer
 * -> API -> database) without touching any component.
 *
 * Field names map 1:1 to a future snake_case table:
 * title, client_name, category, description, full_description, services,
 * technologies, image_url, gallery_images, live_url, completed_at, featured,
 * status, published, created_at.
 */

export type ProjectCategory = "Websites" | "Website Improvement" | "Automation" | "AI";

/** How the work should be presented. Never label non-client work as client work. */
export type ProjectStatus = "Client Project" | "Demo Project" | "Concept Project";

export type Project = {
  id: string;
  title: string;
  /** Only set when the client has permitted publishing their name. */
  clientName?: string;
  /** Explicit permission flag; when false the project is shown anonymously. */
  clientPermission: boolean;
  category: ProjectCategory;
  description: string;
  fullDescription: string;
  problem: string;
  solution: string;
  services: readonly string[];
  technologies: readonly string[];
  /** Populated from storage in future; undefined renders the built-in cover. */
  imageUrl?: string;
  galleryImages: readonly string[];
  /** Only rendered when present — no dead "Live Website" buttons. */
  liveUrl?: string;
  completedAt?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
};

export type ProjectResult<T> = { ok: true; data: T } | { ok: false; message: string };

export const projectCategories: readonly ProjectCategory[] = ["Websites", "Website Improvement", "Automation", "AI"];

const LOAD_ERROR = "Unable to load projects right now. Please try again later.";

/** Static source of truth for now. Replace with a backend read later. */
const staticProjects: readonly Project[] = [
  {
    id: "northstar-advisory",
    title: "Northstar Advisory",
    clientPermission: false,
    category: "Websites",
    description: "A website concept for a growing advisory firm, designed around trust, clarity, and qualified inquiries.",
    fullDescription:
      "A structured concept exploring how a professional services firm can explain a complex offer without overwhelming a first-time visitor. The layout moves from positioning, to proof of thinking, to a single clear inquiry path.",
    problem: "Professional service offers are easy to over-explain, leaving visitors unsure what to do next.",
    solution: "A calm information hierarchy, one primary action per section, and an inquiry form that asks only what is needed to start a conversation.",
    services: ["AI Website Creation", "Content Structure", "Conversion Design"],
    technologies: ["React", "Responsive UI", "Accessible Forms"],
    galleryImages: [],
    completedAt: "2026-02-01",
    featured: true,
    published: true,
    createdAt: "2026-01-12",
  },
  {
    id: "relay-operations",
    title: "Relay Operations",
    clientPermission: false,
    category: "Automation",
    description: "A sample workflow for organising incoming requests and routing the right information to a team.",
    fullDescription:
      "A sample automation design that maps how an inquiry travels from a form, through classification, to the person who should act on it. The design keeps a human review step at every decision point.",
    problem: "A fragmented inquiry process with repeated manual sorting and delayed internal follow-up.",
    solution: "A mapped workflow that classifies requests, prepares clear next actions, and notifies the right owner while keeping people in control.",
    services: ["AI Business Automation", "Workflow Design"],
    technologies: ["Workflow Design", "AI Processing", "Notifications"],
    galleryImages: [],
    completedAt: "2026-03-10",
    featured: true,
    published: true,
    createdAt: "2026-02-20",
  },
  {
    id: "mira-health-studio",
    title: "Mira Health Studio",
    clientPermission: false,
    category: "Website Improvement",
    description: "A mobile-first redesign concept that simplifies service discovery and makes contact pathways easier to find.",
    fullDescription:
      "A redesign concept focused on the mobile journey: shorter navigation, services surfaced earlier, and one consistent call to action across every screen size.",
    problem: "Dense navigation, buried services, and inconsistent calls to action across devices.",
    solution: "A clearer hierarchy, a simplified mobile menu, and a single predictable inquiry path from service discovery to contact.",
    services: ["Website Improvement / Redesign", "UX Review"],
    technologies: ["UX Audit", "Mobile UI", "Content Structure"],
    galleryImages: [],
    completedAt: "2026-04-05",
    featured: false,
    published: true,
    createdAt: "2026-03-18",
  },
];

/** Concept and sample work must never read as real client work. */
export function projectStatus(project: Project): ProjectStatus {
  if (project.category === "Automation" && !project.clientName) return "Demo Project";
  return project.clientName ? "Client Project" : "Concept Project";
}

/** Client identity is only ever exposed with explicit permission. */
export function projectClientLabel(project: Project): string | undefined {
  if (!project.clientPermission || !project.clientName) return undefined;
  return project.clientName;
}

export function formatCompletion(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

async function load(): Promise<readonly Project[]> {
  return staticProjects.filter((project) => project.published);
}

export async function getProjects(options?: { category?: ProjectCategory }): Promise<ProjectResult<readonly Project[]>> {
  try {
    const all = await load();
    const data = options?.category ? all.filter((project) => project.category === options.category) : all;
    return { ok: true, data };
  } catch {
    return { ok: false, message: LOAD_ERROR };
  }
}

export async function getProjectById(id: string): Promise<ProjectResult<Project | undefined>> {
  try {
    const all = await load();
    return { ok: true, data: all.find((project) => project.id === id) };
  } catch {
    return { ok: false, message: LOAD_ERROR };
  }
}

export async function getFeaturedProjects(limit?: number): Promise<ProjectResult<readonly Project[]>> {
  try {
    const all = await load();
    const featured = all.filter((project) => project.featured);
    return { ok: true, data: typeof limit === "number" ? featured.slice(0, limit) : featured };
  } catch {
    return { ok: false, message: LOAD_ERROR };
  }
}

export const projectQueries = {
  all: (category?: ProjectCategory) => ({
    queryKey: ["projects", category ?? "all"] as const,
    queryFn: () => getProjects(category ? { category } : undefined),
  }),
  featured: (limit?: number) => ({
    queryKey: ["projects", "featured", limit ?? "all"] as const,
    queryFn: () => getFeaturedProjects(limit),
  }),
  byId: (id: string) => ({
    queryKey: ["projects", "detail", id] as const,
    queryFn: () => getProjectById(id),
  }),
};
