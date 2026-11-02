import type {
  BrandColorEntry,
  BrandColorCategory,
  BrandGuideline,
  BrandGuidelineValues,
  BrandIdentityField,
  BrandIdentityValues,
  BrandLogoSlot,
  BrandTypographyRecommendation,
} from "@/types/brand-kit";

export const BRAND_COLOR_CATEGORIES: Array<{ id: BrandColorCategory; label: string }> = [
  { id: "primary", label: "Primary" },
  { id: "secondary", label: "Secondary" },
  { id: "accent", label: "Accent" },
  { id: "neutral", label: "Neutral" },
];

// These are editable visual samples, not verified SFA brand colors.
export const BRAND_COLOR_STARTERS: BrandColorEntry[] = [
  { id: "sample-primary", name: "Sample violet", hex: "#7053D8", category: "primary", verification: "sample" },
  { id: "sample-secondary", name: "Sample slate", hex: "#536174", category: "secondary", verification: "sample" },
  { id: "sample-accent", name: "Sample mint", hex: "#44A581", category: "accent", verification: "sample" },
  { id: "sample-neutral-ink", name: "Sample ink", hex: "#202033", category: "neutral", verification: "sample" },
  { id: "sample-neutral-paper", name: "Sample paper", hex: "#F8F8FB", category: "neutral", verification: "sample" },
];

export const BRAND_LOGO_SLOTS: BrandLogoSlot[] = [
  { id: "primary-logo", title: "Primary logo", description: "Main approved organization logo." },
  { id: "alternative-logo", title: "Alternative logo", description: "Approved alternate lockup or orientation." },
  { id: "monochrome-logo", title: "Monochrome logo", description: "Approved single-color logo variant." },
  { id: "organizational-marks", title: "Other organizational marks", description: "Chapter, partner, or related marks with usage confirmed." },
];

export const BRAND_IDENTITY_FIELDS: BrandIdentityField[] = [
  {
    key: "officialOrganizationName",
    label: "Official organization name",
    placeholder: "Enter the verified official name",
    description: "Use the formal name approved for public communications.",
  },
  {
    key: "chapterDesignation",
    label: "Chapter designation",
    placeholder: "Enter the verified chapter designation",
    description: "Leave blank until the official chapter form is confirmed.",
  },
  {
    key: "organizationDescription",
    label: "Organization description",
    placeholder: "Enter an approved organization description",
    description: "Use a description approved by the organization.",
    multiline: true,
  },
  {
    key: "tagline",
    label: "Tagline",
    placeholder: "Enter an approved tagline",
    description: "No tagline is prefilled because none is verified in the project.",
  },
  {
    key: "officialHashtags",
    label: "Official hashtags",
    placeholder: "Enter verified hashtags, separated by spaces",
    description: "Only add hashtags confirmed for official use.",
    multiline: true,
  },
  {
    key: "socialMediaIdentity",
    label: "Social media identity",
    placeholder: "Enter verified account names or handles",
    description: "Add official account names and handles after verification.",
    multiline: true,
  },
];

export const BRAND_IDENTITY_STARTERS: BrandIdentityValues = {
  officialOrganizationName: "",
  chapterDesignation: "",
  organizationDescription: "",
  tagline: "",
  officialHashtags: "",
  socialMediaIdentity: "",
};

export const PROJECT_PROVIDED_NAME_REFERENCE = {
  value: "SFA–CSPC",
  note: "This short form appears in the project context. Confirm its official styling and full name before publication.",
};

export const BRAND_TYPOGRAPHY_RECOMMENDATIONS: BrandTypographyRecommendation[] = [
  {
    id: "heading",
    label: "Heading sample",
    family: "Inter when available; otherwise system sans-serif",
    weights: "600–700",
    usage: "Sample suggestion for titles and short display headings. Verify the approved typeface and hierarchy before official use.",
    sample: "Clear headings help readers find the main message.",
  },
  {
    id: "body",
    label: "Body copy sample",
    family: "Inter when available; otherwise system sans-serif",
    weights: "400–500",
    usage: "Sample suggestion for captions and longer descriptions. Prioritize comfortable reading size and contrast.",
    sample: "Use a readable type size for supporting information and longer copy.",
  },
];

export const BRAND_GUIDELINES: BrandGuideline[] = [
  {
    id: "logoUsage",
    title: "Logo usage",
    starterText: "Use a verified approved logo version. Confirm clear space, minimum size, background, and permitted variants from the official guide.",
  },
  {
    id: "colorUsage",
    title: "Color usage",
    starterText: "Use verified palette values. Maintain readable contrast and confirm any supporting or accent colors before publication.",
  },
  {
    id: "typography",
    title: "Typography",
    starterText: "Use approved typefaces and hierarchy once confirmed. Keep text readable and avoid mixing styles without a clear purpose.",
  },
  {
    id: "visualConsistency",
    title: "Visual consistency",
    starterText: "Keep alignment, spacing, image treatment, and graphic style consistent across related materials. Verify campaign-specific rules.",
  },
  {
    id: "socialCommunication",
    title: "Social media communication",
    starterText: "Use confirmed account names and handles. Check audience, platform layout, dates, links, and participation details before posting.",
  },
  {
    id: "captionStandards",
    title: "Caption standards",
    starterText: "Whenever available and relevant, include WHAT is happening, WHEN it takes place, and WHERE it happens. Verify names, dates, venues, and calls to action before publishing.",
  },
];

export const BRAND_GUIDELINE_STARTERS: BrandGuidelineValues = Object.fromEntries(
  BRAND_GUIDELINES.map((guideline) => [guideline.id, guideline.starterText]),
) as BrandGuidelineValues;
