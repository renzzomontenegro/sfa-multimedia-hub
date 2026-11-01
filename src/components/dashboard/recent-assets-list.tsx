import { FileImage, FileText, Film } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { recentAssets } from "@/data/dashboard";
import { EmptyState } from "@/components/dashboard/empty-state";
import { SectionHeader } from "@/components/dashboard/section-header";

const fileIcons: Record<string, LucideIcon> = {
  Image: FileImage,
  Video: Film,
  Document: FileText,
};

export function RecentAssetsList() {
  return (
    <section className="surface-card p-5 sm:p-6" aria-labelledby="recent-assets-heading">
      <SectionHeader id="recent-assets-heading" title="Recent assets" description="Files recently added to your library" />
      {recentAssets.length === 0 ? (
        <EmptyState title="Your library is ready" description="New assets will show up here." />
      ) : (
        <ul className="divide-y divide-border">
          {recentAssets.map((asset) => {
            const fileKind = asset.kind.split(" · ")[0];
            const Icon = fileIcons[fileKind] ?? FileText;

            return (
              <li key={asset.id} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                <span className={`asset-mark asset-mark-${asset.color}`} aria-hidden="true">
                  <Icon size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{asset.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{asset.kind}</p>
                </div>
                <p className="hidden shrink-0 text-xs text-muted-foreground sm:block">{asset.updated}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
