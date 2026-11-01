import { CalendarDays, Check, FolderKanban, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StatCardData } from "@/types/dashboard";

const icons: Record<StatCardData["icon"], LucideIcon> = {
  folder: FolderKanban,
  check: Check,
  calendar: CalendarDays,
  sparkles: Sparkles,
};

type StatCardProps = {
  stat: StatCardData;
};

export function StatCard({ stat }: StatCardProps) {
  const Icon = icons[stat.icon];

  return (
    <article className="surface-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
        </div>
        <span className={`stat-icon stat-icon-${stat.accent}`}>
          <Icon size={19} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{stat.note}</p>
    </article>
  );
}
