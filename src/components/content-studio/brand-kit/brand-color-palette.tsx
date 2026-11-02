"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { BRAND_COLOR_CATEGORIES } from "@/data/brand-kit";
import type { BrandColorCategory, BrandColorEntry, ClipboardFeedback } from "@/types/brand-kit";
import { CopyButton } from "./copy-button";

const HEX_PATTERN = /^#(?:[\da-fA-F]{3}|[\da-fA-F]{6})$/;
const normalizeHex = (value: string) => {
  const hex = value.toUpperCase();
  return hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex;
};

type BrandColorPaletteProps = {
  colors: BrandColorEntry[];
  feedback?: ClipboardFeedback;
  onCopy: (id: string, value: string) => void;
  onChange: (colors: BrandColorEntry[]) => void;
};

export function BrandColorPalette({ colors, feedback, onCopy, onChange }: BrandColorPaletteProps) {
  const addColor = (category: BrandColorCategory) => {
    let suffix = colors.length + 1;
    while (colors.some((color) => color.id === `custom-${suffix}`)) suffix += 1;
    const id = `custom-${suffix}`;
    onChange([...colors, { id, name: "New sample color", hex: "#808080", category, verification: "custom" }]);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm leading-6 text-foreground">
        Sample colors are for layout and editing only. None are confirmed SFA brand colors. Replace or remove them after checking an approved reference.
      </div>
      {BRAND_COLOR_CATEGORIES.map((category) => {
        const entries = colors.filter((color) => color.category === category.id);
        return (
          <section key={category.id} aria-labelledby={`color-${category.id}`}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 id={`color-${category.id}`} className="text-sm font-semibold text-foreground">{category.label}</h3>
              <button type="button" onClick={() => addColor(category.id)} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Plus size={15} aria-hidden="true" /> Add {category.label.toLowerCase()} color
              </button>
            </div>
            {entries.length ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {entries.map((color) => <ColorEditor key={color.id} color={color} feedback={feedback} onCopy={onCopy} onChange={(next) => onChange(colors.map((item) => item.id === color.id ? next : item))} onRemove={() => onChange(colors.filter((item) => item.id !== color.id))} />)}
            </div> : <p className="rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">No colors in this category yet.</p>}
          </section>
        );
      })}
    </div>
  );
}

function ColorEditor({ color, feedback, onCopy, onChange, onRemove }: {
  color: BrandColorEntry;
  feedback?: ClipboardFeedback;
  onCopy: (id: string, value: string) => void;
  onChange: (color: BrandColorEntry) => void;
  onRemove: () => void;
}) {
  const [hexDraft, setHexDraft] = useState(color.hex);
  const [hexError, setHexError] = useState("");
  const updateHexDraft = (value: string) => {
    setHexDraft(value);
    if (HEX_PATTERN.test(value.trim())) {
      onChange({ ...color, hex: normalizeHex(value.trim()) });
      setHexError("");
    } else {
      setHexError("Enter a valid HEX value, such as #7053D8.");
    }
  };

  return (
    <article className="rounded-xl border border-border bg-background p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span aria-label={`Color preview ${color.hex}`} className="size-12 shrink-0 rounded-xl border border-border shadow-inner" style={{ backgroundColor: color.hex }} />
        <label className="min-w-0 flex-1 text-xs font-medium text-muted-foreground">Color name
          <input value={color.name} onChange={(event) => onChange({ ...color, name: event.target.value })} className="mt-1 min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        </label>
        <button type="button" onClick={onRemove} aria-label={`Remove ${color.name || "color"}`} className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Trash2 size={16} aria-hidden="true" /></button>
      </div>
      <label className="block text-xs font-medium text-muted-foreground">HEX value
        <div className="mt-1 flex gap-2">
          <input value={hexDraft} onChange={(event) => updateHexDraft(event.target.value)} aria-invalid={Boolean(hexError)} aria-describedby={hexError ? `${color.id}-hex-error` : undefined} className="min-h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 font-mono text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          <input type="color" value={/^#[\da-fA-F]{6}$/.test(color.hex) ? color.hex : "#808080"} aria-label={`Choose ${color.name} color`} onChange={(event) => { setHexDraft(event.target.value.toUpperCase()); setHexError(""); onChange({ ...color, hex: event.target.value.toUpperCase() }); }} className="size-10 cursor-pointer rounded-lg border border-border bg-background p-1" />
        </div>
      </label>
      {hexError ? <p id={`${color.id}-hex-error`} className="mt-1 text-xs text-destructive">{hexError}</p> : null}
      <p className="mt-2 text-xs text-muted-foreground">{color.verification === "sample" ? "Editable sample · verify before use" : "Editable reference"}</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <code className="text-sm font-semibold text-foreground">{color.hex}</code>
        <CopyButton id={`hex-${color.id}`} value={color.hex} label={`${color.name || "color"} HEX`} feedback={feedback} onCopy={onCopy} compact />
      </div>
    </article>
  );
}
