"use client";

import { useEffect, useRef, useState } from "react";
import { Info, PenLine } from "lucide-react";
import { CaptionEditor } from "@/components/content-studio/caption-editor";
import { CaptionPreview } from "@/components/content-studio/caption-preview";
import { CaptionTemplatePicker } from "@/components/content-studio/caption-template-picker";
import { CaptionToneGuidance } from "@/components/content-studio/caption-tone-guidance";
import { WhatWhenWhereFields } from "@/components/content-studio/what-when-where-fields";
import { countCaptionCharacters } from "@/lib/caption-fonts";
import type { CaptionCopyFeedback, CaptionTemplate, CaptionToneId, WhatWhenWhereDetails } from "@/types/caption-builder";

const EMPTY_DETAILS: WhatWhenWhereDetails = { what: "", when: "", where: "" };

export function CaptionBuilder() {
  const [caption, setCaption] = useState("");
  const [tone, setTone] = useState<CaptionToneId>("professional");
  const [details, setDetails] = useState<WhatWhenWhereDetails>(EMPTY_DETAILS);
  const [copyFeedback, setCopyFeedback] = useState<CaptionCopyFeedback | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const characterCount = countCaptionCharacters(caption);

  useEffect(() => {
    if (!copyFeedback) return;
    const timer = window.setTimeout(() => setCopyFeedback(null), 2400);
    return () => window.clearTimeout(timer);
  }, [copyFeedback]);

  function updateCaption(value: string) {
    setCaption(value);
    setCopyFeedback(null);
  }

  function insertAtCursor(insertion: string) {
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart ?? caption.length;
    const end = textarea?.selectionEnd ?? caption.length;
    const prefix = caption.slice(0, start);
    const suffix = caption.slice(end);
    const leadingBreak = prefix.length > 0 && !prefix.endsWith("\n") ? "\n\n" : "";
    const trailingBreak = suffix.length > 0 && !suffix.startsWith("\n") ? "\n\n" : "";
    const insertedText = `${leadingBreak}${insertion}${trailingBreak}`;
    const nextCaption = `${prefix}${insertedText}${suffix}`;
    updateCaption(nextCaption);

    window.requestAnimationFrame(() => {
      const nextTextarea = textareaRef.current;
      if (!nextTextarea) return;
      const cursor = prefix.length + insertedText.length;
      nextTextarea.focus();
      nextTextarea.setSelectionRange(cursor, cursor);
    });
  }

  function insertTemplate(template: CaptionTemplate) {
    insertAtCursor(template.starterText);
  }

  function insertDetails() {
    const lines = [
      details.what.trim() ? `WHAT: ${details.what.trim()}` : "",
      details.when.trim() ? `WHEN: ${details.when.trim()}` : "",
      details.where.trim() ? `WHERE: ${details.where.trim()}` : "",
    ].filter(Boolean);

    if (lines.length > 0) insertAtCursor(lines.join("\n"));
  }

  async function copyCaption() {
    if (!caption) return;

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(caption);
      setCopyFeedback({ status: "success", message: "Caption copied to clipboard." });
    } catch {
      setCopyFeedback({
        status: "error",
        message: "Clipboard access failed. Select the caption text and copy it manually.",
      });
    }
  }

  function clearCaption() {
    updateCaption("");
    textareaRef.current?.focus();
  }

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 sm:space-y-7">
      <section>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/60 dark:text-violet-300">
          <PenLine size={13} aria-hidden="true" />
          Content Studio
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">Caption Builder</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Build a clear, organized caption with reusable structures and optional detail prompts.
        </p>
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:gap-6">
        <div className="space-y-5">
          <CaptionEditor
            value={caption}
            characterCount={characterCount}
            feedback={copyFeedback}
            textareaRef={textareaRef}
            onChange={updateCaption}
            onClear={clearCaption}
            onCopy={copyCaption}
          />
          <CaptionTemplatePicker onInsert={insertTemplate} />
          <WhatWhenWhereFields details={details} onChange={setDetails} onInsert={insertDetails} />
          <CaptionToneGuidance value={tone} onChange={setTone} />
        </div>

        <div className="space-y-4">
          <CaptionPreview caption={caption} />
          <div className="rounded-xl border border-violet-200/80 bg-violet-50/70 px-4 py-3.5 dark:border-violet-900/70 dark:bg-violet-950/25">
            <div className="flex items-start gap-3">
              <Info size={17} className="mt-0.5 shrink-0 text-violet-700 dark:text-violet-300" aria-hidden="true" />
              <p className="text-xs leading-5 text-violet-950 dark:text-violet-100">
                Before publishing, verify names, dates, venues, and participation details. WHAT, WHEN, and WHERE can remain blank when unavailable or not relevant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
