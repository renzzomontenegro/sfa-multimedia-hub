export const CAPTION_FONT_STYLES = [
  { id: "bold", label: "Bold" },
  { id: "italic", label: "Italic" },
  { id: "bold-italic", label: "Bold Italic" },
  { id: "sans-serif", label: "Sans-serif" },
  { id: "sans-serif-bold", label: "Sans-serif Bold" },
  { id: "sans-serif-italic", label: "Sans-serif Italic" },
  { id: "sans-serif-bold-italic", label: "Sans-serif Bold Italic" },
  { id: "monospace", label: "Monospace" },
  { id: "script", label: "Script" },
  { id: "bold-script", label: "Bold Script" },
  { id: "fraktur", label: "Fraktur" },
  { id: "bold-fraktur", label: "Bold Fraktur" },
  { id: "double-struck", label: "Double-struck" },
  { id: "circled", label: "Circled" },
  { id: "small-caps", label: "Small Caps" },
] as const;

export type CaptionFontStyleId = (typeof CAPTION_FONT_STYLES)[number]["id"];
export type CaptionFontStyle = (typeof CAPTION_FONT_STYLES)[number];

type AlphabetOptions = {
  upperStart?: number;
  lowerStart?: number;
  digitStart?: number;
  upperOverrides?: Record<string, string>;
  lowerOverrides?: Record<string, string>;
};

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";

function addRange(map: Map<string, string>, characters: string, start: number) {
  Array.from(characters).forEach((character, index) => {
    map.set(character, String.fromCodePoint(start + index));
  });
}

function createAlphabetMap(options: AlphabetOptions) {
  const map = new Map<string, string>();

  if (options.upperStart !== undefined) addRange(map, UPPERCASE, options.upperStart);
  if (options.lowerStart !== undefined) addRange(map, LOWERCASE, options.lowerStart);
  if (options.digitStart !== undefined) addRange(map, DIGITS, options.digitStart);

  for (const [character, replacement] of Object.entries(options.upperOverrides ?? {})) {
    map.set(character, replacement);
  }
  for (const [character, replacement] of Object.entries(options.lowerOverrides ?? {})) {
    map.set(character, replacement);
  }

  return map;
}

function createCircledMap() {
  const map = createAlphabetMap({ upperStart: 0x24b6, lowerStart: 0x24d0 });
  map.set("0", "⓪");
  addRange(map, "123456789", 0x2460);
  return map;
}

const SMALL_CAPS: Record<string, string> = {
  A: "ᴀ", B: "ʙ", C: "ᴄ", D: "ᴅ", E: "ᴇ", F: "ꜰ", G: "ɢ", H: "ʜ", I: "ɪ",
  J: "ᴊ", K: "ᴋ", L: "ʟ", M: "ᴍ", N: "ɴ", O: "ᴏ", P: "ᴘ", Q: "ꞯ", R: "ʀ",
  S: "ꜱ", T: "ᴛ", U: "ᴜ", V: "ᴠ", W: "ᴡ", Y: "ʏ", Z: "ᴢ",
};

const STYLE_MAPS: Record<CaptionFontStyleId, ReadonlyMap<string, string>> = {
  bold: createAlphabetMap({ upperStart: 0x1d400, lowerStart: 0x1d41a, digitStart: 0x1d7ce }),
  italic: createAlphabetMap({
    upperStart: 0x1d434,
    lowerStart: 0x1d44e,
    lowerOverrides: { h: "ℎ" },
  }),
  "bold-italic": createAlphabetMap({ upperStart: 0x1d468, lowerStart: 0x1d482 }),
  "sans-serif": createAlphabetMap({ upperStart: 0x1d5a0, lowerStart: 0x1d5ba }),
  "sans-serif-bold": createAlphabetMap({ upperStart: 0x1d5d4, lowerStart: 0x1d5ee, digitStart: 0x1d7ec }),
  "sans-serif-italic": createAlphabetMap({ upperStart: 0x1d608, lowerStart: 0x1d622 }),
  "sans-serif-bold-italic": createAlphabetMap({ upperStart: 0x1d63c, lowerStart: 0x1d656 }),
  monospace: createAlphabetMap({ upperStart: 0x1d670, lowerStart: 0x1d68a, digitStart: 0x1d7f6 }),
  script: createAlphabetMap({
    upperStart: 0x1d49c,
    lowerStart: 0x1d4b6,
    upperOverrides: { B: "ℬ", E: "ℰ", F: "ℱ", H: "ℋ", I: "ℐ", L: "ℒ", M: "ℳ", R: "ℛ" },
    lowerOverrides: { e: "ℯ", g: "ℊ" },
  }),
  "bold-script": createAlphabetMap({ upperStart: 0x1d4d0, lowerStart: 0x1d4ea }),
  fraktur: createAlphabetMap({
    upperStart: 0x1d504,
    lowerStart: 0x1d51e,
    upperOverrides: { C: "ℭ", H: "ℌ", I: "ℑ", R: "ℜ", Z: "ℨ" },
  }),
  "bold-fraktur": createAlphabetMap({ upperStart: 0x1d56c, lowerStart: 0x1d586 }),
  "double-struck": createAlphabetMap({
    upperStart: 0x1d538,
    lowerStart: 0x1d552,
    digitStart: 0x1d7d8,
    upperOverrides: { C: "ℂ", H: "ℍ", N: "ℕ", P: "ℙ", Q: "ℚ", R: "ℝ", Z: "ℤ" },
  }),
  circled: createCircledMap(),
  "small-caps": new Map(
    Object.entries(SMALL_CAPS).flatMap(([uppercase, smallCap]) => [
      [uppercase, smallCap],
      [uppercase.toLowerCase(), smallCap],
    ]),
  ),
};

/**
 * Replaces supported ASCII letters and style-specific digits with Unicode
 * mathematical alphanumeric symbols. Iterating by code point preserves emoji,
 * combining characters, Filipino letters, punctuation, and line breaks that
 * have no direct mapping.
 */
export function transformCaptionText(text: string, style: CaptionFontStyleId) {
  const replacements = STYLE_MAPS[style];
  return Array.from(text, (character) => replacements.get(character) ?? character).join("");
}

export function countCaptionCharacters(text: string) {
  if (typeof Intl.Segmenter === "undefined") return Array.from(text).length;
  return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)).length;
}
