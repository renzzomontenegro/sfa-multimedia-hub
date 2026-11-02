import Link from "next/link";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";

type CaptionPreviewProps = {
  caption: string;
};

export function CaptionPreview({ caption }: CaptionPreviewProps) {
  return (
    <section className="surface-card p-5 sm:p-6 xl:sticky xl:top-24" aria-labelledby="caption-preview-heading">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 id="caption-preview-heading" className="text-base font-semibold tracking-tight text-foreground">
            Live preview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Social post layout preview</p>
        </div>
      </div>

      <article className="overflow-hidden rounded-xl border border-border bg-background shadow-sm" aria-label="Social media post preview">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-800 dark:bg-violet-950 dark:text-violet-200" aria-hidden="true">
            SFA
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">SFA Multimedia</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Caption preview</p>
          </div>
        </div>
        <div className="flex min-h-40 items-center justify-center border-b border-border bg-muted/60 px-5 py-8 text-muted-foreground">
          <div className="text-center">
            <ImageIcon size={22} className="mx-auto" aria-hidden="true" />
            <p className="mt-2 text-xs">Media preview area</p>
            <p className="mt-1 text-[11px]">No image is attached in this draft.</p>
          </div>
        </div>
        <div className="min-h-36 px-4 py-4">
          {caption ? (
            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-foreground">{caption}</p>
          ) : (
            <p className="text-sm leading-6 text-muted-foreground">Your composed caption will appear here as you write.</p>
          )}
        </div>
      </article>

      <div className="mt-4 border-t border-border pt-4">
        <p className="text-xs leading-5 text-muted-foreground">
          Want to style selected words with Unicode? Copy your caption, then open the generator in a new tab to keep this draft open.
        </p>
        <Link
          href="/content-studio/caption-font-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg text-xs font-semibold text-violet-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:text-violet-200"
        >
          Open Caption Font Generator
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
