"use client";

import { Check, Copy } from "lucide-react";
import type { ClipboardFeedback } from "@/types/brand-kit";

type CopyButtonProps = {
  id: string;
  value: string;
  label: string;
  feedback?: ClipboardFeedback;
  onCopy: (id: string, value: string) => void;
  disabled?: boolean;
  compact?: boolean;
};

export function CopyButton({ id, value, label, feedback, onCopy, disabled, compact }: CopyButtonProps) {
  const status = feedback?.id === id ? feedback : undefined;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onCopy(id, value)}
        disabled={disabled || !value.trim()}
        aria-label={`Copy ${label}`}
        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status?.status === "success" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        <span>{status?.status === "success" ? "Copied" : compact ? "Copy" : "Copy text"}</span>
      </button>
      {status ? <span role="status" className={`text-xs ${status.status === "error" ? "text-destructive" : "text-muted-foreground"}`}>{status.message}</span> : null}
    </div>
  );
}
