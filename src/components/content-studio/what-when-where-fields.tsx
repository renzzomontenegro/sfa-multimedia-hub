import type { WhatWhenWhereDetails } from "@/types/caption-builder";

type WhatWhenWhereFieldsProps = {
  details: WhatWhenWhereDetails;
  onChange: (details: WhatWhenWhereDetails) => void;
  onInsert: () => void;
};

const fields: Array<{ key: keyof WhatWhenWhereDetails; label: string; placeholder: string }> = [
  { key: "what", label: "WHAT", placeholder: "What is happening?" },
  { key: "when", label: "WHEN", placeholder: "Date and time, if known" },
  { key: "where", label: "WHERE", placeholder: "Venue or location, if known" },
];

export function WhatWhenWhereFields({ details, onChange, onInsert }: WhatWhenWhereFieldsProps) {
  const hasDetails = Object.values(details).some((value) => value.trim().length > 0);

  return (
    <section className="surface-card p-5 sm:p-6" aria-labelledby="what-when-where-heading">
      <div className="mb-4">
        <h2 id="what-when-where-heading" className="text-base font-semibold tracking-tight text-foreground">
          WHAT / WHEN / WHERE
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Include these details whenever they are available and relevant. Leave any field blank when it is unknown or does not apply.
        </p>
      </div>
      <div className="grid gap-3">
        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`caption-detail-${field.key}`} className="mb-1.5 block text-xs font-semibold tracking-wide text-muted-foreground">
              {field.label}
            </label>
            <input
              id={`caption-detail-${field.key}`}
              type="text"
              value={details[field.key]}
              onChange={(event) => onChange({ ...details, [field.key]: event.target.value })}
              placeholder={field.placeholder}
              className="min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/75 focus-visible:border-violet-400 focus-visible:ring-4 focus-visible:ring-violet-500/10"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onInsert}
        disabled={!hasDetails}
        className="mt-4 inline-flex min-h-9 items-center rounded-lg border border-violet-200 px-3 text-xs font-semibold text-violet-800 transition hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 dark:border-violet-900 dark:text-violet-200 dark:hover:bg-violet-950/60"
      >
        Insert filled details
      </button>
      <p className="mt-2 text-xs text-muted-foreground">Only completed fields are added to your caption.</p>
    </section>
  );
}
