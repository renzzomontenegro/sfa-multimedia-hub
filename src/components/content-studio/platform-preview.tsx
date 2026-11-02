import { InstagramStoryPreview } from "@/components/content-studio/instagram-story-preview";
import { PlatformFeedPreview } from "@/components/content-studio/platform-feed-preview";
import { PlatformPreviewSelector } from "@/components/content-studio/platform-preview-selector";
import type { LocalPubmat, SocialPreviewPlatform } from "@/types/social-media-preview";

type PlatformPreviewProps = {
  platform: SocialPreviewPlatform;
  image: LocalPubmat | null;
  caption: string;
  onPlatformChange: (platform: SocialPreviewPlatform) => void;
  onImageError: (objectUrl: string) => void;
};

export function PlatformPreview({ platform, image, caption, onPlatformChange, onImageError }: PlatformPreviewProps) {
  return (
    <section className="surface-card p-4 sm:p-6" aria-labelledby="platform-preview-heading">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="platform-preview-heading" className="text-base font-semibold tracking-tight text-foreground">Platform preview</h2>
          <p className="mt-1 text-sm text-muted-foreground">Illustrative layout, not an exact platform replica.</p>
        </div>
      </div>
      <PlatformPreviewSelector value={platform} onChange={onPlatformChange} />
      <div className="mt-5">
        {platform === "instagram-story" ? (
          <InstagramStoryPreview image={image} caption={caption} onImageError={onImageError} />
        ) : (
          <PlatformFeedPreview platform={platform} image={image} caption={caption} onImageError={onImageError} />
        )}
      </div>
    </section>
  );
}
