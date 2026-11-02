import { Check, Copy } from "lucide-react";
import type { CaptionFontStyle } from "@/lib/caption-fonts";
import { Button } from "@/components/ui/button";

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
    <article className="surface-card flex min-w-0 flex-col p-4" aria-labelledby={`font-style-${style.id}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 id={`font-style-${style.id}`} className="truncate text-sm font-semibold text-foreground">
            {style.label}
          </h3>
        </div>
        <Button
          variant="primary"
          size="small"
          onClick={onCopy}
          aria-label={`Copy ${style.label} text`}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <p className="mt-3 min-h-16 whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/70 px-3 py-3 text-sm leading-6 text-foreground">
        {preview}
      </p>
      <p className="mt-2 min-h-4 text-xs text-muted-foreground" role="status" aria-live="polite">
        {feedback?.status === "error" ? feedback.message : copied ? feedback.message : ""}
      </p>
    </article>
  );
}
