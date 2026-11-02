import type { AspectRatioGuide, SocialPreviewPlatform } from "@/types/social-media-preview";

export const SOCIAL_PREVIEW_PLATFORMS: Array<{ id: SocialPreviewPlatform; label: string }> = [
  { id: "instagram-feed", label: "Instagram Feed" },
  { id: "facebook-feed", label: "Facebook Feed" },
  { id: "instagram-story", label: "Instagram Story" },
];

export const ASPECT_RATIO_GUIDES: AspectRatioGuide[] = [
  { ratio: "1:1", label: "Square", description: "A balanced square feed layout." },
  { ratio: "4:5", label: "Portrait", description: "A taller portrait feed layout." },
  { ratio: "9:16", label: "Story", description: "A full-height vertical story layout." },
];
