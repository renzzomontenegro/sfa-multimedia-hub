import { Clock3 } from "lucide-react";
import { ActivityItem } from "@/components/dashboard/activity-item";
import { EmptyState } from "@/components/dashboard/empty-state";
import { RecentAssetsList } from "@/components/dashboard/recent-assets-list";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { UpcomingContentList } from "@/components/dashboard/upcoming-content-list";
import { dashboardStats, recentActivity } from "@/data/dashboard";

export function OverviewPage() {
  return (
    <div className="page-container space-y-7">
      <PageHeader
        eyebrow={(
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-surface px-2.5 py-1 text-[11px] font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            Sample dashboard data
          </span>
        )}
        title="Welcome back, creative team"
        description="Here’s what’s happening across your multimedia workspace today."
        action={(
          <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-muted-foreground">
            <Clock3 size={14} aria-hidden="true" /> Sample snapshot
          </span>
        )}
      />

      <section aria-label="Workspace summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.length === 0 ? (
          <div className="sm:col-span-2 xl:col-span-4">
            <EmptyState title="No workspace summary yet" description="Summary cards will appear when dashboard data is available." />
          </div>
        ) : dashboardStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <section className="surface-card p-5 sm:p-6" aria-labelledby="recent-activity-heading">
          <SectionHeader
            id="recent-activity-heading"
            title="Recent activity"
            description="A pulse on what your team has been working on"
          />
          {recentActivity.length === 0 ? (
            <EmptyState title="No recent activity" description="Team updates will appear here when work begins." />
          ) : (
            <ul className="divide-y divide-border">
              {recentActivity.map((activity) => <ActivityItem key={activity.id} activity={activity} />)}
            </ul>
          )}
        </section>
        <UpcomingContentList />
      </section>

      <section>
        <RecentAssetsList />
      </section>
      <footer className="pb-2 text-center text-xs text-muted-foreground">
        SFA Multimedia Hub · Phase 1 preview
      </footer>
    </div>
  );
}
