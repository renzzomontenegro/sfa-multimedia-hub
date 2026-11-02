import { Trash2 } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";

type CaptionTextInputProps = {
  value: string;
  characterCount: number;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function CaptionTextInput({ value, characterCount, onChange, onClear }: CaptionTextInputProps) {
  return (
    <section className="surface-card p-4 sm:p-5" aria-labelledby="caption-input-heading">
      <SectionHeader
        id="caption-input-heading"
        descriptionId="caption-input-help"
        title="Your caption"
        description="Type or paste text below. Line breaks and punctuation stay as written."
      />
      <label className="sr-only" htmlFor="caption-text">Caption text</label>
      <textarea
        id="caption-text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={"Write your caption here…\n\nTry letters, numbers, emojis, and Filipino text."}
        rows={7}
        aria-describedby="caption-input-help caption-character-count"
        className="form-control form-control-multiline"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p id="caption-character-count" className="text-xs tabular-nums text-muted-foreground" aria-live="polite">
          {characterCount} {characterCount === 1 ? "character" : "characters"}
        </p>
        <Button
          variant="secondary"
          size="small"
          onClick={onClear}
          disabled={value.length === 0}
          aria-label="Clear caption text"
        >
          <Trash2 size={14} aria-hidden="true" />
          Clear text
        </Button>
      </div>
    </section>
  );
}
