import { Trash2 } from "lucide-react";

type CaptionTextInputProps = {
  value: string;
  characterCount: number;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function CaptionTextInput({ value, characterCount, onChange, onClear }: CaptionTextInputProps) {
  return (
    <section className="surface-card p-5 sm:p-6" aria-labelledby="caption-input-heading">
      <div className="mb-4">
        <h2 id="caption-input-heading" className="text-base font-semibold tracking-tight text-foreground">
          Your caption
        </h2>
        <p id="caption-input-help" className="mt-1 text-sm text-muted-foreground">
          Type or paste text below. Line breaks and punctuation stay as written.
        </p>
      </div>
      <label className="sr-only" htmlFor="caption-text">Caption text</label>
      <textarea
        id="caption-text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={"Write your caption here…\n\nTry letters, numbers, emojis, and Filipino text."}
        rows={7}
        aria-describedby="caption-input-help caption-character-count"
        className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/75 focus-visible:border-violet-400 focus-visible:ring-4 focus-visible:ring-violet-500/10"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p id="caption-character-count" className="text-xs tabular-nums text-muted-foreground" aria-live="polite">
          {characterCount} {characterCount === 1 ? "character" : "characters"}
        </p>
        <button
          type="button"
          onClick={onClear}
          disabled={value.length === 0}
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Trash2 size={14} aria-hidden="true" />
          Clear text
        </button>
      </div>
    </section>
  );
}
