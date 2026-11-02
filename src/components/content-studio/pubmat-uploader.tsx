"use client";

import { useRef, type ChangeEvent } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { LocalPubmatImage } from "@/components/content-studio/local-pubmat-image";
import { MAX_PUBMAT_SIZE_BYTES } from "@/hooks/use-local-pubmat";
import type { LocalPubmat } from "@/types/social-media-preview";

type PubmatUploaderProps = {
  selection: LocalPubmat | null;
  error: string | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
  onImageError: (objectUrl: string) => void;
};

function formatFileSize(size: number) {
  return size >= 1024 * 1024 ? `${(size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(size / 1024))} KB`;
}

export function PubmatUploader({ selection, error, onSelect, onRemove, onImageError }: PubmatUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (file) onSelect(file);
    event.currentTarget.value = "";
  }

  return (
    <section className="surface-card p-5 sm:p-6" aria-labelledby="pubmat-uploader-heading">
      <div className="mb-4">
        <h2 id="pubmat-uploader-heading" className="text-base font-semibold tracking-tight text-foreground">
          Pubmat image
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Select a PNG, JPG, JPEG, or WEBP image up to 10 MB.</p>
      </div>

      <input
        ref={inputRef}
        id="pubmat-image-file"
        type="file"
        accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
        onChange={handleFileChange}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      {selection ? (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-3 sm:flex-row sm:items-center">
          <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:size-20">
            <LocalPubmatImage
              src={selection.objectUrl}
              alt={`Selected pubmat: ${selection.file.name}`}
              sizes="80px"
              onError={onImageError}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="break-all text-sm font-medium text-foreground">{selection.file.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {selection.file.type || "Image"} · {formatFileSize(selection.file.size)}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex min-h-9 items-center rounded-lg border border-border px-3 text-xs font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
              Replace image
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
              aria-label="Remove selected pubmat image"
            >
              <Trash2 size={14} aria-hidden="true" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background px-5 py-6 text-center">
          <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300" aria-hidden="true">
            <ImagePlus size={19} />
          </span>
          <p className="text-sm font-medium text-foreground">No pubmat selected</p>
          <p id="pubmat-image-help" className="mt-1 text-xs text-muted-foreground">Choose an image to see it in the platform previews.</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-4 inline-flex min-h-9 items-center rounded-lg bg-violet-700 px-3 text-xs font-semibold text-white transition hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:bg-violet-500 dark:hover:bg-violet-400"
          >
            Choose image
          </button>
        </div>
      )}

      <p id="pubmat-image-error" className="mt-2 min-h-4 text-xs text-rose-700 dark:text-rose-300" role="alert">
        {error ?? ""}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        The image stays on this device as a temporary preview. It is not uploaded or saved and will be cleared when you leave or refresh this page. Max size: {formatFileSize(MAX_PUBMAT_SIZE_BYTES)}.
      </p>
    </section>
  );
}
