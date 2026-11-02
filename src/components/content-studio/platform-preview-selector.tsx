import { SOCIAL_PREVIEW_PLATFORMS } from "@/data/social-media-preview";
import type { SocialPreviewPlatform } from "@/types/social-media-preview";

type PlatformPreviewSelectorProps = {
  value: SocialPreviewPlatform;
  onChange: (platform: SocialPreviewPlatform) => void;
};

export function PlatformPreviewSelector({ value, onChange }: PlatformPreviewSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-2 rounded-xl bg-muted p-1.5 sm:grid-cols-3" role="group" aria-label="Choose a platform preview">
      {SOCIAL_PREVIEW_PLATFORMS.map((platform) => (
        <button
          key={platform.id}
          type="button"
          onClick={() => onChange(platform.id)}
          aria-pressed={value === platform.id}
          className={`min-h-10 rounded-lg px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
            value === platform.id
              ? "bg-card text-violet-800 shadow-sm dark:text-violet-200"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {platform.label}
        </button>
      ))}
    </div>
  );
}
