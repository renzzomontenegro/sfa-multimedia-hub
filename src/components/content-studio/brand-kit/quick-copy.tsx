"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import type { CopyableBrandText, ClipboardFeedback } from "@/types/brand-kit";

export function QuickCopy({ options, feedback, onCopy }: {
  options: CopyableBrandText[];
  feedback?: ClipboardFeedback;
  onCopy: (id: string, value: string) => void;
}) {
  const available = options.filter((option) => option.value.trim());
  const [selectedId, setSelectedId] = useState(available[0]?.id ?? "");
  const selected = available.find((option) => option.id === selectedId) ?? available[0];
  return <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
    <label className="min-w-0 flex-1 text-sm font-medium text-foreground">Select text to copy
      <select value={selected?.id ?? ""} onChange={(event) => setSelectedId(event.target.value)} disabled={!available.length} className="mt-1.5 min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">
        {!available.length ? <option value="">No text entered yet</option> : null}
        {available.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
      </select>
    </label>
    <button type="button" disabled={!selected} onClick={() => selected && onCopy(`quick-${selected.id}`, selected.value)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"><Copy size={16} aria-hidden="true" />Copy selected text</button>
    {feedback?.id.startsWith("quick-") ? <span role="status" className={`text-sm ${feedback.status === "error" ? "text-destructive" : "text-muted-foreground"}`}>{feedback.message}</span> : null}
  </div>;
}
