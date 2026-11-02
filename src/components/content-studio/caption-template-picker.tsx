import { FilePlus2 } from "lucide-react";
import { CAPTION_TEMPLATES } from "@/data/caption-builder";
import type { CaptionTemplate } from "@/types/caption-builder";

type CaptionTemplatePickerProps = {
  onInsert: (template: CaptionTemplate) => void;
};

export function CaptionTemplatePicker({ onInsert }: CaptionTemplatePickerProps) {
  return (
    <section className="surface-card p-5 sm:p-6" aria-labelledby="caption-templates-heading">
      <div className="mb-4">
        <h2 id="caption-templates-heading" className="text-base font-semibold tracking-tight text-foreground">
          Reusable templates
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Insert an editable structure at your cursor. Existing draft text stays in place.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {CAPTION_TEMPLATES.map((template) => (
          <article key={template.id} className="rounded-xl border border-border bg-background p-4">
            <h3 className="text-sm font-semibold text-foreground">{template.title}</h3>
            <p className="mt-1.5 min-h-10 text-xs leading-5 text-muted-foreground">{template.description}</p>
            <button
              type="button"
              onClick={() => onInsert(template)}
              className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-violet-200 px-3 text-xs font-semibold text-violet-800 transition hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-violet-900 dark:text-violet-200 dark:hover:bg-violet-950/60"
              aria-label={`Insert ${template.title} starter structure at the caption cursor`}
            >
              <FilePlus2 size={14} aria-hidden="true" />
              Insert template
            </button>
          </article>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Bracketed prompts are placeholders. Replace them with verified details before publishing.
      </p>
    </section>
  );
}
