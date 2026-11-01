export type StatCardData = {
  label: string;
  value: string;
  note: string;
  icon: "folder" | "check" | "calendar" | "sparkles";
  accent: "violet" | "amber" | "blue" | "emerald";
};

export type ActivityEntry = {
  id: string;
  title: string;
  description: string;
  time: string;
  initials: string;
  color: "violet" | "blue" | "amber" | "emerald";
};

export type UpcomingContentEntry = {
  id: string;
  title: string;
  channel: string;
  date: string;
  time: string;
  color: "violet" | "blue" | "rose";
};

export type RecentAssetEntry = {
  id: string;
  name: string;
  kind: string;
  updated: string;
  initials: string;
  color: "violet" | "blue" | "amber";
};
