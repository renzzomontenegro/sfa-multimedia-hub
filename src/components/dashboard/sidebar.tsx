"use client";

import { ChevronLeft, ChevronRight, Command, Sparkles, X } from "lucide-react";
import { navigationGroups } from "@/components/dashboard/navigation";
import { NavItem } from "@/components/dashboard/nav-item";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigate?: () => void;
  isMobileDrawer?: boolean;
};

export function Sidebar({ collapsed, onToggleCollapse, onNavigate, isMobileDrawer = false }: SidebarProps) {
  return (
    <aside className={`sidebar${collapsed ? " sidebar-collapsed" : ""}`} aria-label="Sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark" aria-hidden="true"><Command size={19} /></span>
        {!collapsed ? (
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-tight text-foreground">SFA Hub</span>
            <span className="block truncate text-xs text-muted-foreground">Multimedia workspace</span>
          </span>
        ) : <span className="sr-only">SFA Multimedia Hub</span>}
      </div>

      <div className="workspace-switcher">
        <span className="workspace-avatar" aria-hidden="true">S</span>
        {!collapsed ? (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-foreground">SFA Creative</span>
              <span className="mt-0.5 block text-[11px] text-muted-foreground">Workspace</span>
            </span>
          </>
        ) : <span className="sr-only">SFA Creative workspace</span>}
      </div>

      <nav className="sidebar-navigation" aria-label="Main navigation">
        {navigationGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            {!collapsed ? <p className="nav-group-label">{group.label}</p> : <span className="sr-only">{group.label}</span>}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem key={item.label} item={item} collapsed={collapsed} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className={`sidebar-note${collapsed ? " sidebar-note-collapsed" : ""}`}>
          <span className="sidebar-note-icon" aria-hidden="true"><Sparkles size={16} /></span>
          {!collapsed ? (
            <span>
              <span className="block text-xs font-medium text-foreground">Your creative space</span>
              <span className="mt-1 block text-[11px] leading-4 text-muted-foreground">A home for every idea and asset.</span>
            </span>
          ) : <span className="sr-only">Your creative space</span>}
        </div>
        <Button
          type="button"
          variant="quiet"
          className="sidebar-collapse"
          onClick={onToggleCollapse}
          aria-label={isMobileDrawer ? "Close navigation menu" : collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isMobileDrawer ? "Close navigation menu" : collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isMobileDrawer ? <X size={17} aria-hidden="true" /> : collapsed ? <ChevronRight size={17} aria-hidden="true" /> : <ChevronLeft size={17} aria-hidden="true" />}
          {!collapsed ? <span>{isMobileDrawer ? "Close navigation" : "Collapse sidebar"}</span> : null}
        </Button>
      </div>
    </aside>
  );
}
