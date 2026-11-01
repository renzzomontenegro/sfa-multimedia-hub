import {
  Archive,
  CalendarDays,
  CheckSquare,
  CircleHelp,
  Clapperboard,
  LayoutDashboard,
  Library,
  Palette,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavigationEntry = {
  label: string;
  icon: LucideIcon;
  href?: string;
  current?: boolean;
};

export type NavigationGroup = {
  label: string;
  items: NavigationEntry[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", icon: LayoutDashboard, href: "/", current: true }],
  },
  {
    label: "Content Studio",
    items: [
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
