import type {
  ActivityEntry,
  RecentAssetEntry,
  StatCardData,
  UpcomingContentEntry,
} from "@/types/dashboard";

export const dashboardStats: StatCardData[] = [
  {
    label: "Active projects",
    value: "08",
    note: "Across 3 workspaces",
    icon: "folder",
    accent: "violet",
  },
  {
    label: "Pending approvals",
    value: "12",
    note: "4 need your attention",
    icon: "check",
    accent: "amber",
  },
  {
    label: "Upcoming publications",
    value: "06",
    note: "Next one in 2 days",
    icon: "calendar",
    accent: "blue",
  },
  {
    label: "Completed tasks",
    value: "24",
    note: "This month",
    icon: "sparkles",
    accent: "emerald",
  },
];

export const recentActivity: ActivityEntry[] = [
  {
    id: "activity-1",
    title: "Maya Chen",
    description: "uploaded new brand photography to Spring Campaign",
    time: "12 min ago",
    initials: "MC",
    color: "violet",
  },
  {
    id: "activity-2",
    title: "Jordan Lee",
    description: "left feedback on the Product Launch video",
    time: "48 min ago",
    initials: "JL",
    color: "blue",
  },
  {
    id: "activity-3",
    title: "You",
    description: "approved the Community Stories newsletter",
    time: "2 hours ago",
    initials: "YO",
    color: "amber",
  },
  {
    id: "activity-4",
    title: "Sam Rivera",
    description: "created a new project, Summer Field Notes",
    time: "Yesterday",
    initials: "SR",
    color: "emerald",
  },
];

export const upcomingContent: UpcomingContentEntry[] = [
  {
    id: "content-1",
    title: "A closer look at our new collection",
    channel: "Instagram · Carousel",
    date: "Nov 3",
    time: "10:30 AM",
    color: "violet",
  },
  {
    id: "content-2",
    title: "Behind the scenes: studio day",
    channel: "YouTube · Video",
    date: "Nov 5",
    time: "2:00 PM",
    color: "rose",
  },
  {
    id: "content-3",
    title: "The weekly creative edit",
    channel: "Newsletter · Email",
    date: "Nov 7",
    time: "9:00 AM",
    color: "blue",
  },
];

export const recentAssets: RecentAssetEntry[] = [
  {
    id: "asset-1",
    name: "Spring campaign hero",
    kind: "Image · PNG",
    updated: "Edited 20 min ago",
    initials: "IMG",
    color: "violet",
  },
  {
    id: "asset-2",
    name: "Studio day — final cut",
    kind: "Video · MP4",
    updated: "Edited yesterday",
    initials: "VID",
    color: "blue",
  },
  {
    id: "asset-3",
    name: "Brand voice guidelines",
    kind: "Document · PDF",
    updated: "Edited Oct 30",
    initials: "PDF",
    color: "amber",
  },
];
