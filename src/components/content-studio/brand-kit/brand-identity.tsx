"use client";

import { BRAND_IDENTITY_FIELDS, PROJECT_PROVIDED_NAME_REFERENCE } from "@/data/brand-kit";
import type { BrandIdentityKey, BrandIdentityValues, ClipboardFeedback } from "@/types/brand-kit";
import { CopyButton } from "./copy-button";

export function BrandIdentity({ values, feedback, onCopy, onChange }: {
  values: BrandIdentityValues;
  feedback?: ClipboardFeedback;
  onCopy: (id: string, value: string) => void;
  onChange: (key: BrandIdentityKey, value: string) => void;
}) {
  return <div className="space-y-4">
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Project context · verify before official use</p>
      <p className="mt-1 text-lg font-semibold text-foreground">{PROJECT_PROVIDED_NAME_REFERENCE.value}</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{PROJECT_PROVIDED_NAME_REFERENCE.note}</p>
      <div className="mt-3"><CopyButton id="project-name-reference" label="project name reference" value={PROJECT_PROVIDED_NAME_REFERENCE.value} feedback={feedback} onCopy={onCopy} compact /></div>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {BRAND_IDENTITY_FIELDS.map((field) => {
        const inputClass = "mt-1.5 min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
        return <div key={field.key} className="rounded-xl border border-border bg-background p-4">
          <label htmlFor={`identity-${field.key}`} className="text-sm font-medium text-foreground">{field.label}</label>
          {field.multiline ? <textarea id={`identity-${field.key}`} rows={3} value={values[field.key]} onChange={(event) => onChange(field.key, event.target.value)} placeholder={field.placeholder} className={`${inputClass} resize-y`} /> : <input id={`identity-${field.key}`} value={values[field.key]} onChange={(event) => onChange(field.key, event.target.value)} placeholder={field.placeholder} className={inputClass} />}
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{field.description} Empty fields are unverified.</p>
          {(["officialOrganizationName", "tagline", "officialHashtags"] as BrandIdentityKey[]).includes(field.key) ? <div className="mt-3"><CopyButton id={`identity-${field.key}`} label={field.label.toLowerCase()} value={values[field.key]} feedback={feedback} onCopy={onCopy} compact /></div> : null}
        </div>;
      })}
    </div>
  </div>;
}
