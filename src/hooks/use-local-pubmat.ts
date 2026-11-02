"use client";

import { useEffect, useRef, useState } from "react";
import type { LocalPubmat } from "@/types/social-media-preview";

export const MAX_PUBMAT_SIZE_BYTES = 10 * 1024 * 1024;

const MIME_BY_EXTENSION: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

const UNKNOWN_MIME_TYPES = new Set(["", "application/octet-stream"]);

function validatePubmatFile(file: File) {
  if (file.size === 0) return "This file is empty. Choose a non-empty PNG, JPG, JPEG, or WEBP image.";
  if (file.size > MAX_PUBMAT_SIZE_BYTES) return "Choose an image smaller than 10 MB.";

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const expectedMime = MIME_BY_EXTENSION[extension];
  const actualMime = file.type.toLowerCase();
  const hasSupportedFormat = expectedMime && (
    actualMime === expectedMime || UNKNOWN_MIME_TYPES.has(actualMime)
  );

  if (!hasSupportedFormat) return "Unsupported image format. Choose a PNG, JPG, JPEG, or WEBP image.";
  return null;
}

export function useLocalPubmat() {
  const [selection, setSelection] = useState<LocalPubmat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const selectionRef = useRef<LocalPubmat | null>(null);

  useEffect(() => {
    const objectUrl = selection?.objectUrl;
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [selection?.objectUrl]);

  function selectFile(file: File) {
    const validationError = validatePubmatFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const nextSelection = { file, objectUrl: URL.createObjectURL(file) };
      selectionRef.current = nextSelection;
      setSelection(nextSelection);
      setError(null);
    } catch {
      setError("This image could not be opened for a local preview. Try another file.");
    }
  }

  function clearSelection() {
    selectionRef.current = null;
    setSelection(null);
    setError(null);
  }

  function reportImageError(objectUrl: string) {
    if (selectionRef.current?.objectUrl !== objectUrl) return;
    selectionRef.current = null;
    setSelection(null);
    setError("This file could not be decoded as an image. Try a valid PNG, JPG, JPEG, or WEBP file.");
  }

  return { selection, error, selectFile, clearSelection, reportImageError };
}
