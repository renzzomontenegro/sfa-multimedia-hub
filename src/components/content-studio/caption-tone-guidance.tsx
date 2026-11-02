import { CAPTION_TONES } from "@/data/caption-builder";
import type { CaptionToneId } from "@/types/caption-builder";

type CaptionToneGuidanceProps = {
  value: CaptionToneId;
  onChange: (tone: CaptionToneId) => void;
};

export function CaptionToneGuidance({ value, onChange }: CaptionToneGuidanceProps) {
  const selectedTone = CAPTION_TONES.find((tone) => tone.id === value) ?? CAPTION_TONES[0];

  return (
    <section className="surface-card p-5 sm:p-6" aria-labelledby="caption-tone-heading">
      <fieldset>
        <legend id="caption-tone-heading" className="text-base font-semibold tracking-tight text-foreground">
          Writing tone
        </legend>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose guidance for your own writing. This selection does not rewrite the caption.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {CAPTION_TONES.map((tone) => (
            <label key={tone.id} className="cursor-pointer">
              <input
                type="radio"
                name="caption-tone"
                value={tone.id}
                checked={value === tone.id}
                onChange={() => onChange(tone.id)}
                className="peer sr-only"
              />
              <span className="flex min-h-10 items-center justify-center rounded-lg border border-border bg-background px-3 text-xs font-medium text-muted-foreground transition peer-checked:border-violet-400 peer-checked:bg-violet-50 peer-checked:text-violet-800 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500 dark:peer-checked:border-violet-800 dark:peer-checked:bg-violet-950/60 dark:peer-checked:text-violet-200">
                {tone.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-3 rounded-lg bg-muted/70 px-3 py-2.5 text-xs leading-5 text-muted-foreground" aria-live="polite">
        <span className="font-semibold text-foreground">{selectedTone.label}:</span> {selectedTone.description}
      </p>
    </section>
  );
}
