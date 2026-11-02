import {
  Archive,
  BookOpen,
  CalendarDays,
  CheckSquare,
  CircleHelp,
  Clapperboard,
  LayoutDashboard,
  Library,
  Palette,
  PenLine,
  Settings2,
  Sparkles,
  Type,
  Images,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavigationEntry = {
  label: string;
  icon: LucideIcon;
  href?: string;
  pageTitle?: string;
};

export type NavigationGroup = {
  label: string;
  items: NavigationEntry[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", pageTitle: "Overview", icon: LayoutDashboard, href: "/" }],
  },
  {
    label: "Content Studio",
    items: [
      { label: "Brand Kit", pageTitle: "Brand Kit", icon: BookOpen, href: "/content-studio/brand-kit" },
      { label: "Caption Builder", pageTitle: "Caption Builder", icon: PenLine, href: "/content-studio/caption-builder" },
      { label: "Caption Font Generator", pageTitle: "Caption Font Generator", icon: Type, href: "/content-studio/caption-font-generator" },
      { label: "Social Media Preview", pageTitle: "Social Media Preview", icon: Images, href: "/content-studio/social-media-preview" },
      { label: "Content calendar", icon: CalendarDays },
      { label: "Campaigns", icon: Clapperboard },
      { label: "Approvals", icon: CheckSquare },
    ],
  },
  {
    label: "Asset Management",
    items: [
      { label: "Asset library", icon: Library },
      { label: "Collections", icon: Archive },
    ],
  },
  {
    label: "Team Workspace",
    items: [
      { label: "Team", icon: Users },
      { label: "Tasks", icon: CheckSquare },
    ],
  },
  {
    label: "Utilities",
    items: [
      { label: "Templates", icon: Palette },
      { label: "Brand resources", icon: Sparkles },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Preferences", icon: Settings2 },
      { label: "Help center", icon: CircleHelp },
    ],
  },
];

export function isNavigationEntryCurrent(pathname: string, href?: string) {
  if (!href) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function getCurrentPageTitle(pathname: string) {
  for (const group of navigationGroups) {
    const match = group.items.find((item) => isNavigationEntryCurrent(pathname, item.href));
    if (match) return match.pageTitle ?? match.label;
  }

  return "Dashboard";
}
