"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImagePlus, RotateCcw, Trash2 } from "lucide-react";
import { BRAND_LOGO_SLOTS } from "@/data/brand-kit";
import type { LocalBrandAsset } from "@/types/brand-kit";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
const MAX_BYTES = 5 * 1024 * 1024;

export function BrandLogoLibrary() {
  return <div className="space-y-4">
    <p className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm leading-6 text-foreground">No official SFA logo assets were found in this project. Add verified files here for a temporary local preview. Files stay in this browser session and are not uploaded or saved after you leave or refresh.</p>
    <div className="grid gap-4 md:grid-cols-2">
      {BRAND_LOGO_SLOTS.map((slot) => <LogoUpload key={slot.id} title={slot.title} description={slot.description} />)}
    </div>
  </div>;
}

function LogoUpload({ title, description }: { title: string; description: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [asset, setAsset] = useState<LocalBrandAsset | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUrl = asset?.objectUrl;
    return () => { if (currentUrl) URL.revokeObjectURL(currentUrl); };
  }, [asset?.objectUrl]);

  const handleFile = (file?: File) => {
    setError("");
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Choose a PNG, JPG, JPEG, WEBP, or SVG image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Choose an image smaller than 5 MB.");
      return;
    }
    setAsset({ file, objectUrl: URL.createObjectURL(file) });
  };

  return <article className="rounded-xl border border-border bg-background p-4">
    <div className="flex items-start justify-between gap-3">
      <div><h3 className="text-sm font-semibold text-foreground">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
      {asset ? <button type="button" onClick={() => setAsset(null)} aria-label={`Remove ${title}`} className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Trash2 size={16} aria-hidden="true" /></button> : null}
    </div>
    <div className="mt-4 flex min-h-40 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/30 p-4">
      {asset ? <Image src={asset.objectUrl} alt={`Temporary local preview of ${title}`} width={640} height={360} unoptimized className="max-h-44 w-full object-contain" /> : <div className="text-center"><ImagePlus size={25} className="mx-auto text-muted-foreground" aria-hidden="true" /><p className="mt-2 text-sm font-medium text-foreground">Upload a verified logo</p><p className="mt-1 text-xs text-muted-foreground">PNG, JPG, WEBP, or SVG · up to 5 MB</p></div>}
    </div>
    {error ? <p role="alert" className="mt-2 text-xs text-destructive">{error}</p> : null}
    {asset ? <p className="mt-2 truncate text-xs text-muted-foreground">{asset.file.name}</p> : null}
    <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="sr-only" aria-label={`Select ${title} file`} onChange={(event) => { handleFile(event.currentTarget.files?.[0]); event.currentTarget.value = ""; }} />
    <button type="button" onClick={() => inputRef.current?.click()} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{asset ? <RotateCcw size={15} aria-hidden="true" /> : <ImagePlus size={15} aria-hidden="true" />}{asset ? "Replace image" : "Choose image"}</button>
  </article>;
}
