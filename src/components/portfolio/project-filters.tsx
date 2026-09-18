import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/lib/projects";

/**
 * Category filter. Only rendered when there are enough projects across enough
 * categories for filtering to be useful (see the Work page).
 */
export function ProjectFilters({ categories, active, onChange }: { categories: readonly ProjectCategory[]; active: ProjectCategory | "All"; onChange: (value: ProjectCategory | "All") => void }) {
  const options: readonly (ProjectCategory | "All")[] = ["All", ...categories];
  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          type="button"
          size="sm"
          variant={option === active ? "default" : "outline"}
          aria-pressed={option === active}
          onClick={() => onChange(option)}
          className={cn("rounded-full", option === active && "shadow-sm")}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
