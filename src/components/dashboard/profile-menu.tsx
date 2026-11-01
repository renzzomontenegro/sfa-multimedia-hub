"use client";

import { ChevronDown, UserRound } from "lucide-react";

export function ProfileMenu() {
  return (
    <details className="profile-menu">
      <summary className="profile-trigger" aria-label="Open profile placeholder">
        <span className="profile-avatar" aria-hidden="true">U</span>
        <span className="hidden text-left sm:block">
          <span className="block text-xs font-semibold text-foreground">Your profile</span>
          <span className="mt-0.5 block text-[11px] text-muted-foreground">Placeholder</span>
        </span>
        <ChevronDown size={15} className="hidden text-muted-foreground sm:block" aria-hidden="true" />
      </summary>
      <div className="profile-popover">
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <UserRound size={16} className="text-muted-foreground" aria-hidden="true" />
          <p className="text-xs font-medium text-foreground">Profile menu placeholder</p>
        </div>
        <p className="px-4 py-3 text-xs leading-5 text-muted-foreground">
          Account features will be added in a later phase.
        </p>
      </div>
    </details>
  );
}
