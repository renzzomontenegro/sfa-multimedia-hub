"use client";

import { BRAND_GUIDELINES } from "@/data/brand-kit";
import type { BrandGuidelineId, BrandGuidelineValues, ClipboardFeedback } from "@/types/brand-kit";
import { CopyButton } from "./copy-button";

export function BrandGuidelines({ values, feedback, onCopy, onChange }: {
  values: BrandGuidelineValues;
  feedback?: ClipboardFeedback;
  onCopy: (id: string, value: string) => void;
  onChange: (id: BrandGuidelineId, value: string) => void;
}) {
  return <div className="space-y-4">
    <p className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm leading-6 text-foreground">Editable reference starters only. Confirm wording with the current official brand guide before treating any section as policy.</p>
    <div className="grid gap-4 md:grid-cols-2">
      {BRAND_GUIDELINES.map((guideline) => <article key={guideline.id} className="rounded-xl border border-border bg-background p-4">
        <label htmlFor={`guideline-${guideline.id}`} className="text-sm font-semibold text-foreground">{guideline.title}</label>
        <textarea id={`guideline-${guideline.id}`} rows={4} value={values[guideline.id]} onChange={(event) => onChange(guideline.id, event.target.value)} className="mt-2 min-h-28 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm leading-6 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        {guideline.id === "captionStandards" ? <p className="mt-2 rounded-lg bg-primary/5 px-3 py-2 text-xs leading-5 text-foreground">Caption reminder: include WHAT, WHEN, and WHERE whenever available and relevant.</p> : null}
        <div className="mt-3"><CopyButton id={`guideline-${guideline.id}`} label={guideline.title.toLowerCase()} value={values[guideline.id]} feedback={feedback} onCopy={onCopy} compact /></div>
      </article>)}
    </div>
  </div>;
}
