"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Info, WandSparkles } from "lucide-react";
import { CaptionTextInput } from "@/components/content-studio/caption-text-input";
import { FontResultCard, type CopyFeedback } from "@/components/content-studio/font-result-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
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
    <div className="page-container space-y-6">
      <PageHeader
        eyebrow={<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary"><WandSparkles size={14} aria-hidden="true" />Content Studio</span>}
        title="Caption Font Generator"
        description="Preview 15 Unicode text styles and copy the version you want to use in a caption."
      />

      <CaptionTextInput
        value={text}
        characterCount={characterCount}
        onChange={updateText}
        onClear={clearText}
      />

      <aside className="ui-notice flex items-start gap-3 rounded-xl px-4 py-3" aria-label="Unicode text compatibility note">
        <Info size={16} className="mt-0.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <p className="text-xs leading-5 text-secondary-foreground">
          These styles use Unicode characters, not font formatting. Their appearance and pronunciation can vary by platform and screen reader. Characters without a matching Unicode style are kept unchanged.
        </p>
      </aside>

      <section aria-labelledby="font-results-heading">
        <SectionHeader
          id="font-results-heading"
          title="Generated styles"
          description="Choose a style to copy. All 15 variations update as you edit the caption."
          action={text ? (
            <Button
              variant="secondary"
              size="small"
              onClick={() => copyToClipboard(allResultsText, "all")}
              aria-label="Copy all 15 styled caption results with their style names"
            >
              {copyState?.target === "all" && copyState.feedback.status === "success" ? (
                <Check size={14} aria-hidden="true" />
              ) : <Copy size={14} aria-hidden="true" />}
              {copyState?.target === "all" && copyState.feedback.status === "success" ? "Copied all" : "Copy all styles"}
            </Button>
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
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
