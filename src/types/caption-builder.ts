export type CaptionTemplateId = "event-announcement" | "congratulations" | "partnership" | "general-announcement";

export type CaptionTemplate = {
  id: CaptionTemplateId;
  title: string;
  description: string;
  starterText: string;
};

export type CaptionToneId = "professional" | "formal" | "celebratory" | "engaging";

export type CaptionToneGuidance = {
  id: CaptionToneId;
  label: string;
  description: string;
};

export type WhatWhenWhereDetails = {
  what: string;
  when: string;
  where: string;
};

export type CaptionCopyFeedback = {
  status: "success" | "error";
  message: string;
};
