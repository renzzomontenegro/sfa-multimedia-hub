"use client";

import { useEffect, useState } from "react";
import { Eye, Image as ImageIcon } from "lucide-react";
import { AspectRatioGuidance } from "@/components/content-studio/aspect-ratio-guidance";
import { PlatformPreview } from "@/components/content-studio/platform-preview";
import { PubmatUploader } from "@/components/content-studio/pubmat-uploader";
import { SocialCaptionInput } from "@/components/content-studio/social-caption-input";
import { useLocalPubmat } from "@/hooks/use-local-pubmat";
import { countCaptionCharacters } from "@/lib/caption-fonts";
import type { CaptionCopyFeedback } from "@/types/caption-builder";
import type { SocialPreviewPlatform } from "@/types/social-media-preview";

export function SocialMediaPreview() {
  const [caption, setCaption] = useState("");
  const [platform, setPlatform] = useState<SocialPreviewPlatform>("instagram-feed");
  const [copyFeedback, setCopyFeedback] = useState<CaptionCopyFeedback | null>(null);
  const { selection, error, selectFile, clearSelection, reportImageError } = useLocalPubmat();
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

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 sm:space-y-7">
      <section>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/60 dark:text-violet-300">
          <Eye size={13} aria-hidden="true" />
          Content Studio
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">Social Media Preview</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Review an SFA–CSPC pubmat and caption together before sharing them for publication or approval.
        </p>
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(380px,1.1fr)] xl:gap-6">
        <div className="space-y-5">
          <PubmatUploader
            selection={selection}
            error={error}
            onSelect={selectFile}
            onRemove={clearSelection}
            onImageError={reportImageError}
          />
          <SocialCaptionInput
            value={caption}
            characterCount={characterCount}
            feedback={copyFeedback}
            onChange={updateCaption}
            onClear={() => updateCaption("")}
            onCopy={copyCaption}
          />
        </div>

        <div className="space-y-5">
          <PlatformPreview
            platform={platform}
            image={selection}
            caption={caption}
            onPlatformChange={setPlatform}
            onImageError={reportImageError}
          />
          <AspectRatioGuidance />
        </div>
      </div>

      <footer className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-xs leading-5 text-muted-foreground">
        <ImageIcon size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
        Local previews are temporary. The image remains on this device and is not uploaded or stored by SFA Multimedia Hub.
      </footer>
    </div>
  );
}
