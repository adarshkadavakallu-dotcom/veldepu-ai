import { Bot, Code2, Gauge, Layers3, RefreshCw, Workflow } from "lucide-react";

export const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Websites", to: "/websites" },
  { label: "Website Improvement", to: "/website-improvement" },
  { label: "Automation", to: "/automation" },
  { label: "Process", to: "/process" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export const services = [
  {
    title: "AI Website Creation",
    shortTitle: "Websites",
    description: "Modern, responsive business websites designed to turn visitors into customers.",
    features: ["Modern UI", "Responsive design", "Conversion-focused structure", "Contact forms", "SEO-ready structure", "Fast user experience"],
    to: "/websites",
    cta: "Explore Websites",
    icon: Code2,
  },
  {
    title: "Website Improvement / Redesign",
    shortTitle: "Website Improvement",
    description: "Improve an existing website's design, usability, performance, and customer experience.",
    features: ["UI redesign", "Mobile improvements", "UX improvements", "Performance improvements", "Content structure", "Conversion improvements"],
    to: "/website-improvement",
    cta: "Improve My Website",
    icon: RefreshCw,
  },
  {
    title: "AI Business Automation",
    shortTitle: "Automation",
    description: "Automate repetitive business processes so your team can spend more time on important work.",
    features: ["Workflow automation", "Lead handling", "Notifications", "Data processing", "AI-assisted workflows", "Business process automation"],
    to: "/automation",
    cta: "Explore Automation",
    icon: Workflow,
  },
] as const;

export const faqs = [
  { question: "What services do you offer?", answer: "We focus on three services: AI website creation, website improvement and redesign, and practical AI business automation." },
  { question: "How long does a website take?", answer: "Timing depends on the scope, content, and feedback cycle. After understanding your requirements, we provide a clear project plan and realistic timeline." },
  { question: "Can you improve an existing website?", answer: "Yes. We can improve its visual design, mobile experience, structure, usability, performance, and conversion journey without changing what already works." },
  { question: "Can you automate repetitive business tasks?", answer: "Yes. We map the current workflow first, then identify practical opportunities for lead handling, notifications, data processing, and AI-assisted tasks." },
  { question: "Do you work with small businesses?", answer: "Yes. Our approach is designed to be clear and practical for growing businesses as well as established teams." },
  { question: "How do I start a project?", answer: "Share your goals through the project inquiry form. We'll review the details and respond with a tailored plan and next steps." },
] as const;

export const processSteps = [
  { number: "01", title: "Understand", text: "We understand the business and requirements." },
  { number: "02", title: "Plan", text: "We decide the right website or automation approach." },
  { number: "03", title: "Build", text: "We design and develop the solution." },
  { number: "04", title: "Test", text: "We test usability and functionality." },
  { number: "05", title: "Launch", text: "The completed solution is prepared for launch." },
] as const;

export const values = [
  { title: "Better Websites", text: "Clearer, faster digital experiences.", icon: Layers3 },
  { title: "Smarter Workflows", text: "Practical systems built around your work.", icon: Workflow },
  { title: "Less Manual Work", text: "Reduce repetitive steps and handoffs.", icon: Bot },
  { title: "Built for Growth", text: "Foundations that can evolve with you.", icon: Gauge },
] as const;

export const projects = [
  {
    name: "Northstar Advisory",
    label: "Concept Project",
    category: "Business Website",
    description: "A focused website concept for a growing advisory firm, designed around trust, clarity, and qualified inquiries.",
    technologies: ["React", "Responsive UI", "Accessible Forms"],
    challenge: "The concept explores how a complex professional service can be explained clearly without overwhelming potential clients.",
    outcome: "A calm, structured experience that guides visitors from understanding the offer to starting a conversation.",
  },
  {
    name: "Relay Operations",
    label: "Sample Project",
    category: "Business Automation",
    description: "A sample workflow for organizing incoming requests and routing the right information to a team.",
    technologies: ["Workflow Design", "AI Processing", "Notifications"],
    challenge: "The sample maps a fragmented inquiry process with repeated manual sorting and delayed internal follow-up.",
    outcome: "A proposed workflow that classifies requests and prepares clear next actions while keeping people in control.",
  },
  {
    name: "Mira Health Studio",
    label: "Concept Project",
    category: "Website Redesign",
    description: "A mobile-first redesign concept that simplifies service discovery and makes contact pathways easier to find.",
    technologies: ["UX Audit", "Mobile UI", "Content Structure"],
    challenge: "The original concept had dense navigation, buried services, and inconsistent calls to action across devices.",
    outcome: "A clearer hierarchy and an easier mobile journey from service discovery to inquiry.",
  },
] as const;
