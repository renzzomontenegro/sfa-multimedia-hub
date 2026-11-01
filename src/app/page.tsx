import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OverviewPage } from "@/components/dashboard/overview-page";

export default function Home() {
  return (
    <DashboardShell>
      <OverviewPage />
    </DashboardShell>
  );
}
