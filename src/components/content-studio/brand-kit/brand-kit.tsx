"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpenCheck, Info } from "lucide-react";
import { BRAND_COLOR_STARTERS, BRAND_GUIDELINE_STARTERS, BRAND_IDENTITY_STARTERS } from "@/data/brand-kit";
import { SectionHeader } from "@/components/dashboard/section-header";
import type { BrandColorEntry, BrandGuidelineId, BrandGuidelineValues, BrandIdentityKey, BrandIdentityValues, ClipboardFeedback, CopyableBrandText } from "@/types/brand-kit";
import { BrandColorPalette } from "./brand-color-palette";
import { BrandGuidelines } from "./brand-guidelines";
import { BrandIdentity } from "./brand-identity";
import { BrandLogoLibrary } from "./brand-logo-library";
import { BrandTypography } from "./brand-typography";
import { QuickCopy } from "./quick-copy";

export function BrandKit() {
  const [colors, setColors] = useState<BrandColorEntry[]>(() => BRAND_COLOR_STARTERS.map((color) => ({ ...color })));
  const [identity, setIdentity] = useState<BrandIdentityValues>(() => ({ ...BRAND_IDENTITY_STARTERS }));
  const [guidelines, setGuidelines] = useState<BrandGuidelineValues>(() => ({ ...BRAND_GUIDELINE_STARTERS }));
  const [feedback, setFeedback] = useState<ClipboardFeedback>();

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(undefined), 2600);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const copyText = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback({ id, status: "success", message: "Copied to clipboard." });
    } catch {
      setFeedback({ id, status: "error", message: "Clipboard unavailable. Select and copy the text manually." });
    }
  };

  const copyOptions = useMemo<CopyableBrandText[]>(() => [
    { id: "organization-name", label: "Official organization name", value: identity.officialOrganizationName },
    { id: "chapter", label: "Chapter designation", value: identity.chapterDesignation },
    { id: "tagline", label: "Tagline", value: identity.tagline },
    { id: "hashtags", label: "Official hashtags", value: identity.officialHashtags },
    { id: "social-identity", label: "Social media identity", value: identity.socialMediaIdentity },
    ...colors.map((color) => ({ id: `color-${color.id}`, label: `${color.name || "Color"} · ${color.hex}`, value: color.hex })),
    { id: "guideline-caption", label: "Caption standards", value: guidelines.captionStandards },
  ], [colors, guidelines.captionStandards, identity]);

  const updateIdentity = (key: BrandIdentityKey, value: string) => setIdentity((current) => ({ ...current, [key]: value }));
  const updateGuideline = (id: BrandGuidelineId, value: string) => setGuidelines((current) => ({ ...current, [id]: value }));

  return <div className="mx-auto w-full max-w-7xl space-y-7 pb-10">
    <header className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-background p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"><BookOpenCheck size={21} aria-hidden="true" /></span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Content Studio</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Brand Kit</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">A working reference for verified identity details, approved visual assets, and communication standards.</p>
        </div>
      </div>
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-background/80 p-3.5 text-sm leading-6 text-muted-foreground">
        <Info size={17} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
        <p>Brand Kit edits and selected logo previews are kept only in this page session. They are not saved to a server and will be cleared when you leave or refresh. Confirm every sample or editable reference against an approved source before publication.</p>
      </div>
    </header>

    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6" aria-labelledby="quick-copy-heading">
      <SectionHeader id="quick-copy-heading" title="Quick copy" description="Copy verified text or a HEX value from the current working references." />
      <QuickCopy options={copyOptions} feedback={feedback} onCopy={copyText} />
    </section>

    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6" aria-labelledby="palette-heading">
      <SectionHeader id="palette-heading" title="Color palette" description="Group colors by intended role. Invalid HEX drafts do not change the saved preview value." />
      <BrandColorPalette colors={colors} feedback={feedback} onCopy={copyText} onChange={setColors} />
    </section>

    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6" aria-labelledby="logos-heading">
      <SectionHeader id="logos-heading" title="Logo library" description="Temporary local previews for approved organization artwork." />
      <BrandLogoLibrary />
    </section>

    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6" aria-labelledby="identity-heading">
      <SectionHeader id="identity-heading" title="Brand identity" description="Editable reference fields. Verify official wording, account names, and tags before use." />
      <BrandIdentity values={identity} feedback={feedback} onCopy={copyText} onChange={updateIdentity} />
    </section>

    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6" aria-labelledby="typography-heading">
      <SectionHeader id="typography-heading" title="Typography" description="Sample recommendations for legibility; no typeface is presented as officially approved." />
      <BrandTypography />
    </section>

    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6" aria-labelledby="guidelines-heading">
      <SectionHeader id="guidelines-heading" title="Brand guidelines" description="Editable reminders that can be replaced with confirmed organizational standards." />
      <BrandGuidelines values={guidelines} feedback={feedback} onCopy={copyText} onChange={updateGuideline} />
    </section>
  </div>;
}
