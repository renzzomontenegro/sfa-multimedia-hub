import { Clock3 } from "lucide-react";
import { ActivityItem } from "@/components/dashboard/activity-item";
import { EmptyState } from "@/components/dashboard/empty-state";
import { RecentAssetsList } from "@/components/dashboard/recent-assets-list";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { UpcomingContentList } from "@/components/dashboard/upcoming-content-list";
import { dashboardStats, recentActivity } from "@/data/dashboard";

export function OverviewPage() {
  return (
    <div className="mx-auto max-w-[1440px] space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/60 dark:text-violet-300">
            <span className="size-1.5 rounded-full bg-violet-500" aria-hidden="true" />
            Sample dashboard data
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">Welcome back, creative team</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Here’s what’s happening across your multimedia workspace today.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground sm:self-auto">
          <Clock3 size={14} aria-hidden="true" /> Sample snapshot
        </div>
      </section>

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
