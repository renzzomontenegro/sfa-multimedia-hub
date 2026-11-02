import Link from "next/link";
import { ArrowUpRight, Check, Copy, Trash2 } from "lucide-react";
import type { CaptionCopyFeedback } from "@/types/caption-builder";

type SocialCaptionInputProps = {
  value: string;
  characterCount: number;
  feedback: CaptionCopyFeedback | null;
  onChange: (value: string) => void;
  onClear: () => void;
  onCopy: () => void;
};

export function SocialCaptionInput({ value, characterCount, feedback, onChange, onClear, onCopy }: SocialCaptionInputProps) {
  return (
    <section className="surface-card p-5 sm:p-6" aria-labelledby="social-caption-heading">
      <div className="mb-4">
        <h2 id="social-caption-heading" className="text-base font-semibold tracking-tight text-foreground">
          Caption
        </h2>
        <p id="social-caption-help" className="mt-1 text-sm text-muted-foreground">
          Preview the caption with your pubmat. Line breaks and punctuation are preserved.
        </p>
      </div>
      <label htmlFor="social-preview-caption" className="sr-only">Post caption</label>
      <textarea
        id="social-preview-caption"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={8}
        aria-describedby="social-caption-help social-caption-count"
        placeholder="Write or paste a caption…"
        className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/75 focus-visible:border-violet-400 focus-visible:ring-4 focus-visible:ring-violet-500/10"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p id="social-caption-count" className="text-xs tabular-nums text-muted-foreground" aria-live="polite">
          {characterCount} {characterCount === 1 ? "character" : "characters"}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onClear}
            disabled={!value}
            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Trash2 size={14} aria-hidden="true" />
            Clear caption
          </button>
          <button
            type="button"
            onClick={onCopy}
            disabled={!value}
            aria-label="Copy caption to clipboard"
            className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-violet-700 px-3 text-xs font-semibold text-white transition hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 dark:bg-violet-500 dark:hover:bg-violet-400"
          >
            {feedback?.status === "success" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {feedback?.status === "success" ? "Copied" : "Copy caption"}
          </button>
        </div>
      </div>
      <p className="mt-2 min-h-4 text-xs text-muted-foreground" role="status" aria-live="polite">
        {feedback?.message ?? ""}
      </p>
      <div className="mt-3 border-t border-border pt-3">
        <p className="text-xs leading-5 text-muted-foreground">
          Need help composing? Open Caption Builder in a new tab to keep this preview draft open.
        </p>
        <Link
          href="/content-studio/caption-builder"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-8 items-center gap-2 rounded-lg text-xs font-semibold text-violet-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:text-violet-200"
        >
          Open Caption Builder
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
