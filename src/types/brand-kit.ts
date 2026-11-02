export type BrandColorCategory = "primary" | "secondary" | "accent" | "neutral";
export type BrandColorVerification = "sample" | "custom";

export type BrandColorEntry = {
  id: string;
  name: string;
  hex: string;
  category: BrandColorCategory;
  verification: BrandColorVerification;
};

export type BrandLogoSlot = {
  id: string;
  title: string;
  description: string;
};

export type BrandIdentityKey =
  | "officialOrganizationName"
  | "chapterDesignation"
  | "organizationDescription"
  | "tagline"
  | "officialHashtags"
  | "socialMediaIdentity";

export type BrandIdentityValues = Record<BrandIdentityKey, string>;

export type BrandIdentityField = {
  key: BrandIdentityKey;
  label: string;
  placeholder: string;
  description: string;
  multiline?: boolean;
};

export type BrandTypographyRecommendation = {
  id: "heading" | "body";
  label: string;
  family: string;
  weights: string;
  usage: string;
  sample: string;
};

export type BrandGuidelineId =
  | "logoUsage"
  | "colorUsage"
  | "typography"
  | "visualConsistency"
  | "socialCommunication"
  | "captionStandards";

export type BrandGuideline = {
  id: BrandGuidelineId;
  title: string;
  starterText: string;
};

export type BrandGuidelineValues = Record<BrandGuidelineId, string>;

export type CopyableBrandText = {
  id: string;
  label: string;
  value: string;
};

export type ClipboardFeedback = {
  id: string;
  status: "success" | "error";
  message: string;
};

export type LocalBrandAsset = {
  file: File;
  objectUrl: string;
};
