import { CalendarDays, Clock3 } from "lucide-react";
import { upcomingContent } from "@/data/dashboard";
import { EmptyState } from "@/components/dashboard/empty-state";
import { SectionHeader } from "@/components/dashboard/section-header";

export function UpcomingContentList() {
  return (
    <section className="surface-card p-5 sm:p-6" aria-labelledby="upcoming-content-heading">
      <SectionHeader
        id="upcoming-content-heading"
        title="Upcoming content"
        description="Your next scheduled publications"
      />
      {upcomingContent.length === 0 ? (
        <EmptyState title="Nothing scheduled yet" description="Upcoming content will appear here." />
      ) : (
        <ul className="divide-y divide-border">
          {upcomingContent.map((content) => (
            <li key={content.id} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className={`content-mark content-mark-${content.color}`} aria-hidden="true">
                <CalendarDays size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{content.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{content.channel}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-medium text-foreground">{content.date}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock3 size={12} aria-hidden="true" /> {content.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
