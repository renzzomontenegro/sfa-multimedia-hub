"use client";

import { useState } from "react";
import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { ProfileMenu } from "@/components/dashboard/profile-menu";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";

type TopbarProps = {
  onOpenNavigation: () => void;
  navigationOpen: boolean;
};

export function Topbar({ onOpenNavigation, navigationOpen }: TopbarProps) {
  const [noticeOpen, setNoticeOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="icon-button mobile-menu-button"
          onClick={onOpenNavigation}
          aria-label={navigationOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={navigationOpen}
        >
          <Menu size={19} aria-hidden="true" />
        </button>
        <nav className="hidden items-center gap-2 text-sm sm:flex" aria-label="Breadcrumb">
          <span className="text-muted-foreground">Workspace</span>
          <ChevronRight size={14} className="text-muted-foreground/70" aria-hidden="true" />
          <span className="font-medium text-foreground" aria-current="page">Overview</span>
        </nav>
        <span className="font-semibold text-foreground sm:hidden">Overview</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button type="button" className="icon-button hidden sm:inline-flex" aria-label="Search is planned for a future phase" disabled title="Search is planned for a future phase">
          <Search size={18} aria-hidden="true" />
        </button>
        <div className="relative">
          <button
            type="button"
            className="icon-button"
            onClick={() => setNoticeOpen((open) => !open)}
            aria-label={noticeOpen ? "Close notifications placeholder" : "Open notifications placeholder"}
            aria-expanded={noticeOpen}
          >
            <Bell size={18} aria-hidden="true" />
            <span className="notification-dot" aria-hidden="true" />
          </button>
          {noticeOpen ? (
            <div className="notification-popover" role="status">
              <p className="text-sm font-medium text-foreground">Notifications</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Notification features will be available in a later phase.</p>
            </div>
          ) : null}
        </div>
        <ThemeToggle />
        <span className="mx-1 hidden h-7 w-px bg-border sm:block" aria-hidden="true" />
        <ProfileMenu />
      </div>
    </header>
  );
}
