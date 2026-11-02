import { ImagePlus } from "lucide-react";
import { LocalPubmatImage } from "@/components/content-studio/local-pubmat-image";
import type { LocalPubmat } from "@/types/social-media-preview";

type InstagramStoryPreviewProps = {
  image: LocalPubmat | null;
  caption: string;
  onImageError: (objectUrl: string) => void;
};

export function InstagramStoryPreview({ image, caption, onImageError }: InstagramStoryPreviewProps) {
  return (
    <article className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[28px] border border-border bg-neutral-950 shadow-lg" aria-label="Instagram Story, illustrative vertical preview">
      {image ? (
        <LocalPubmatImage
          src={image.objectUrl}
          alt={`Selected SFA–CSPC pubmat in story frame: ${image.file.name}`}
          sizes="320px"
          className="object-contain"
          onError={onImageError}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white/75">
          <ImagePlus size={27} aria-hidden="true" />
          <p className="text-sm font-medium text-white">Story pubmat preview</p>
          <p className="text-xs leading-5">Choose an image to preview it in a 9:16 frame.</p>
        </div>
      )}
      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 to-transparent px-4 pb-7 pt-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/70 bg-violet-700 text-[9px] font-bold text-white" aria-hidden="true">SFA</span>
          <span className="text-sm font-semibold text-white drop-shadow">SFA–CSPC</span>
          <span className="ml-auto text-[10px] text-white/75">Story preview</span>
        </div>
      </div>
      {caption ? (
        <div className="absolute inset-x-4 bottom-4 max-h-[36%] overflow-y-auto rounded-xl bg-black/65 px-3 py-2.5 text-white shadow backdrop-blur-sm">
          <p className="whitespace-pre-wrap break-words text-sm leading-5">{caption}</p>
        </div>
      ) : null}
    </article>
  );
}
