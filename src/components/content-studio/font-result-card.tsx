import { Check, Copy } from "lucide-react";
import type { CaptionFontStyle } from "@/lib/caption-fonts";

export type CopyFeedback = {
  status: "success" | "error";
  message: string;
};

type FontResultCardProps = {
  style: CaptionFontStyle;
  preview: string;
  feedback?: CopyFeedback;
  onCopy: () => void;
};

export function FontResultCard({ style, preview, feedback, onCopy }: FontResultCardProps) {
  const copied = feedback?.status === "success";

  return (
    <article className="surface-card flex min-w-0 flex-col p-4 sm:p-5" aria-labelledby={`font-style-${style.id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 id={`font-style-${style.id}`} className="truncate text-sm font-semibold text-foreground">
            {style.label}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">Unicode text style</p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-foreground transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:hover:border-violet-800 dark:hover:bg-violet-950/50 dark:hover:text-violet-200"
          aria-label={`Copy ${style.label} text`}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-4 min-h-16 whitespace-pre-wrap break-words rounded-lg bg-muted/70 px-3 py-3 text-sm leading-6 text-foreground">
        {preview}
      </p>
      <p className="mt-2 min-h-4 text-xs text-muted-foreground" role="status" aria-live="polite">
        {feedback?.status === "error" ? feedback.message : copied ? feedback.message : ""}
      </p>
    </article>
  );
}
