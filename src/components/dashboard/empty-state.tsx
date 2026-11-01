import { FolderOpen } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-8 text-center">
      <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <FolderOpen size={19} aria-hidden="true" />
      </span>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
