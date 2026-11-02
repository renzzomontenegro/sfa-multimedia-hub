import type { CaptionTemplate, CaptionToneGuidance } from "@/types/caption-builder";

export const CAPTION_TEMPLATES: CaptionTemplate[] = [
  {
    id: "event-announcement",
    title: "Event Announcement",
    description: "Introduce an event and share the essential details.",
    starterText: "[Attention-grabbing opening]\n\n[Event name]\n[Brief event description]\n\nWHAT: [What is happening?]\nWHEN: [Date and time]\nWHERE: [Venue or location]\n\n[Registration or participation details]\n\n[Call to action]",
  },
  {
    id: "congratulations",
    title: "Congratulations",
    description: "Recognize a person or team and their achievement.",
    starterText: "[Achievement or accomplishment]\n\nCongratulations to [individual or team] for [achievement] at [competition or event]!\n\n[Date and venue, when available]\n\n[Recognition and congratulatory message]",
  },
  {
    id: "partnership",
    title: "Partnership",
    description: "Explain a collaboration and acknowledge the partner.",
    starterText: "[Partner organization] and SFA are collaborating to [purpose of collaboration].\n\n[Relevant event or initiative details]\n\nThank you to [partner organization] for [specific contribution or support].\n\n[Optional next step or call to action]",
  },
  {
    id: "general-announcement",
    title: "General Announcement",
    description: "Share an update, key details, reminders, and next steps.",
    starterText: "[Main announcement]\n\n[Relevant details]\n\nImportant reminders:\n• [Reminder 1]\n• [Reminder 2]\n\n[Call to action]",
  },
];

export const CAPTION_TONES: CaptionToneGuidance[] = [
  {
    id: "professional",
    label: "Professional",
    description: "Keep the message clear, concise, and approachable. Lead with the key information and use specific details.",
  },
  {
    id: "formal",
    label: "Formal",
    description: "Use complete sentences, respectful wording, and a composed structure suited to official communications.",
  },
  {
    id: "celebratory",
    label: "Celebratory",
    description: "Center the people and achievement. Share the significance and express congratulations with warmth.",
  },
  {
    id: "engaging",
    label: "Engaging",
    description: "Write for the audience, make the next step easy to spot, and invite participation without overpromising.",
  },
];
