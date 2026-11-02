import { Bookmark, Heart, MessageCircle, Send, Share2, ThumbsUp } from "lucide-react";
import { LocalPubmatImage } from "@/components/content-studio/local-pubmat-image";
import type { LocalPubmat, SocialPreviewPlatform } from "@/types/social-media-preview";

type PlatformFeedPreviewProps = {
  platform: Extract<SocialPreviewPlatform, "instagram-feed" | "facebook-feed">;
  image: LocalPubmat | null;
  caption: string;
  onImageError: (objectUrl: string) => void;
};

function EmptyImageFrame({ aspectClass }: { aspectClass: string }) {
  return (
    <div className={`flex ${aspectClass} flex-col items-center justify-center gap-2 bg-muted px-5 text-center text-muted-foreground`}>
      <span className="text-sm font-medium text-foreground">Pubmat preview</span>
      <span className="text-xs">Choose a local image to see it here.</span>
    </div>
  );
}

function AccountHeader({ platformName }: { platformName: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 p-0.5" aria-hidden="true">
        <span className="flex size-full items-center justify-center rounded-full bg-card text-[9px] font-bold tracking-tight text-violet-800 dark:text-violet-200">SFA</span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">SFA–CSPC</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Illustrative {platformName} preview</p>
      </div>
      <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">Preview</span>
    </div>
  );
}

export function PlatformFeedPreview({ platform, image, caption, onImageError }: PlatformFeedPreviewProps) {
  const isInstagram = platform === "instagram-feed";
  const platformName = isInstagram ? "Instagram Feed" : "Facebook Feed";
  const aspectClass = isInstagram ? "aspect-[4/5]" : "aspect-square";

  return (
    <article className="mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm" aria-label={`${platformName}, illustrative social post preview`}>
      <AccountHeader platformName={platformName} />
      <div className={`relative ${aspectClass} w-full overflow-hidden bg-muted`}>
        {image ? (
          <LocalPubmatImage
            src={image.objectUrl}
            alt={`Selected SFA–CSPC pubmat: ${image.file.name}`}
            sizes="(max-width: 1280px) 90vw, 560px"
            className="object-contain"
            onError={onImageError}
          />
        ) : <EmptyImageFrame aspectClass="h-full w-full" />}
      </div>
      <div className="flex items-center justify-between px-4 pb-2 pt-3 text-muted-foreground" aria-hidden="true">
        {isInstagram ? (
          <>
            <span className="flex items-center gap-4"><Heart size={19} /><MessageCircle size={19} /><Send size={18} /></span>
            <Bookmark size={19} />
          </>
        ) : (
          <span className="flex items-center gap-5 text-xs font-medium"><span className="flex items-center gap-1.5"><ThumbsUp size={16} /> Like</span><span className="flex items-center gap-1.5"><MessageCircle size={16} /> Comment</span><span className="flex items-center gap-1.5"><Share2 size={16} /> Share</span></span>
        )}
      </div>
      <div className="px-4 pb-4 pt-2">
        {caption ? (
          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-foreground">{caption}</p>
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">Your caption will appear below the pubmat.</p>
        )}
      </div>
    </article>
  );
}
