import { Check, Copy, Trash2 } from "lucide-react";
import type { RefObject } from "react";
import type { CaptionCopyFeedback } from "@/types/caption-builder";

type CaptionEditorProps = {
  value: string;
  characterCount: number;
  feedback: CaptionCopyFeedback | null;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onClear: () => void;
  onCopy: () => void;
};

export function CaptionEditor({
  value,
  characterCount,
  feedback,
  textareaRef,
  onChange,
  onClear,
  onCopy,
}: CaptionEditorProps) {
  return (
    <section className="surface-card p-5 sm:p-6" aria-labelledby="caption-editor-heading">
      <div className="mb-4">
        <h2 id="caption-editor-heading" className="text-base font-semibold tracking-tight text-foreground">
          Caption draft
        </h2>
        <p id="caption-editor-help" className="mt-1 text-sm text-muted-foreground">
          Compose and edit your caption. Line breaks and punctuation are kept as entered.
        </p>
      </div>
      <label htmlFor="caption-builder-text" className="sr-only">Caption draft text</label>
      <textarea
        ref={textareaRef}
        id="caption-builder-text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={12}
        aria-describedby="caption-editor-help caption-builder-count"
        placeholder="Start writing, or insert a template below…"
        className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/75 focus-visible:border-violet-400 focus-visible:ring-4 focus-visible:ring-violet-500/10"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p id="caption-builder-count" className="text-xs tabular-nums text-muted-foreground" aria-live="polite">
          {characterCount} {characterCount === 1 ? "character" : "characters"}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            disabled={value.length === 0}
            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Trash2 size={14} aria-hidden="true" />
            Clear caption
          </button>
          <button
            type="button"
            onClick={onCopy}
            disabled={value.length === 0}
            className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-violet-700 px-3 text-xs font-semibold text-white transition hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 dark:bg-violet-500 dark:text-white dark:hover:bg-violet-400"
            aria-label="Copy caption to clipboard"
          >
            {feedback?.status === "success" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {feedback?.status === "success" ? "Copied" : "Copy caption"}
          </button>
        </div>
      </div>
      <p className="mt-2 min-h-4 text-xs text-muted-foreground" role="status" aria-live="polite">
        {feedback?.status === "error" ? feedback.message : feedback?.status === "success" ? feedback.message : ""}
      </p>
    </section>
  );
}
