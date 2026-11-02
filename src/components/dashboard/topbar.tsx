"use client";

import { ChevronRight, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { getCurrentPageTitle } from "@/components/dashboard/navigation";
import { ProfileMenu } from "@/components/dashboard/profile-menu";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";

type TopbarProps = {
  onOpenNavigation: () => void;
  navigationOpen: boolean;
};

export function Topbar({ onOpenNavigation, navigationOpen }: TopbarProps) {
  const pathname = usePathname();
  const pageTitle = getCurrentPageTitle(pathname);

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
          <span className="font-medium text-foreground" aria-current="page">{pageTitle}</span>
        </nav>
        <span className="font-semibold text-foreground sm:hidden">{pageTitle}</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <ThemeToggle />
        <span className="mx-1 hidden h-7 w-px bg-border sm:block" aria-hidden="true" />
        <ProfileMenu />
      </div>
    </header>
  );
}
