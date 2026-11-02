"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Info, WandSparkles } from "lucide-react";
import { CaptionTextInput } from "@/components/content-studio/caption-text-input";
import { FontResultCard, type CopyFeedback } from "@/components/content-studio/font-result-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { SectionHeader } from "@/components/dashboard/section-header";
import { CAPTION_FONT_STYLES, countCaptionCharacters, transformCaptionText } from "@/lib/caption-fonts";

type FeedbackTarget = "all" | (typeof CAPTION_FONT_STYLES)[number]["id"];

type CopyState = {
  target: FeedbackTarget;
  feedback: CopyFeedback;
} | null;

export function CaptionFontGenerator() {
  const [text, setText] = useState("");
  const [copyState, setCopyState] = useState<CopyState>(null);
  const characterCount = countCaptionCharacters(text);

  const results = useMemo(
    () => CAPTION_FONT_STYLES.map((style) => ({
      ...style,
      preview: transformCaptionText(text, style.id),
    })),
    [text],
  );

  useEffect(() => {
    if (!copyState) return;
    const timer = window.setTimeout(() => setCopyState(null), 2400);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  async function copyToClipboard(value: string, target: FeedbackTarget) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(value);
      setCopyState({
        target,
        feedback: { status: "success", message: "Copied to clipboard." },
      });
    } catch {
      setCopyState({
        target,
        feedback: {
          status: "error",
          message: "Clipboard access failed. Select the preview and copy it manually.",
        },
      });
    }
  }

  function updateText(value: string) {
    setText(value);
    setCopyState(null);
  }

  function clearText() {
    updateText("");
  }

  const allResultsText = results
    .map((result) => `${result.label}\n${result.preview}`)
    .join("\n\n");

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 sm:space-y-7">
      <section>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/60 dark:text-violet-300">
          <WandSparkles size={13} aria-hidden="true" />
          Content Studio
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
          Caption Font Generator
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Turn a caption into copy-ready Unicode text styles for social media.
        </p>
      </section>

      <CaptionTextInput
        value={text}
        characterCount={characterCount}
        onChange={updateText}
        onClear={clearText}
      />

      <section className="rounded-xl border border-violet-200/80 bg-violet-50/70 px-4 py-3.5 dark:border-violet-900/70 dark:bg-violet-950/25" aria-label="Unicode text accessibility note">
        <div className="flex items-start gap-3">
          <Info size={17} className="mt-0.5 shrink-0 text-violet-700 dark:text-violet-300" aria-hidden="true" />
          <p className="text-xs leading-5 text-violet-950 dark:text-violet-100">
            These styles use Unicode characters, not font formatting. Their appearance and pronunciation can vary by platform and screen reader. Characters without a matching Unicode style are kept unchanged.
          </p>
        </div>
      </section>

      <section aria-labelledby="font-results-heading">
        <SectionHeader
          id="font-results-heading"
          title="Font styles"
          description="Choose a style and copy the transformed text."
          action={text ? (
            <button
              type="button"
              onClick={() => copyToClipboard(allResultsText, "all")}
              className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 text-xs font-semibold text-violet-800 transition hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-200 dark:hover:bg-violet-950"
              aria-label="Copy all 15 styled caption results with their style names"
            >
              {copyState?.target === "all" && copyState.feedback.status === "success" ? (
                <Check size={14} aria-hidden="true" />
              ) : <Copy size={14} aria-hidden="true" />}
              {copyState?.target === "all" && copyState.feedback.status === "success" ? "Copied all" : "Copy all"}
            </button>
          ) : null}
        />

        {text.length === 0 ? (
          <EmptyState
            title="Your previews will appear here"
            description="Enter a caption above to see all 15 Unicode text styles."
          />
        ) : (
          <>
            {copyState?.target === "all" ? (
              <p className="mb-3 text-xs text-muted-foreground" role="status" aria-live="polite">
                {copyState.feedback.message}
              </p>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((result) => (
                <FontResultCard
                  key={result.id}
                  style={result}
                  preview={result.preview}
                  feedback={copyState?.target === result.id ? copyState.feedback : undefined}
                  onCopy={() => copyToClipboard(result.preview, result.id)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
