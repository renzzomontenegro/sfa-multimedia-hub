"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavigationEntryCurrent, type NavigationEntry } from "@/components/dashboard/navigation";

type NavItemProps = {
  item: NavigationEntry;
  collapsed: boolean;
  onNavigate?: () => void;
};

export function NavItem({ item, collapsed, onNavigate }: NavItemProps) {
  const pathname = usePathname();
  const Icon = item.icon;
  const current = isNavigationEntryCurrent(pathname, item.href);
  const classes = `nav-item${current ? " nav-item-current" : ""}${collapsed ? " nav-item-collapsed" : ""}`;
  const label = current ? item.label : `${item.label} — planned for a future phase`;

  if (item.href) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className={classes}
        aria-current={current ? "page" : undefined}
        title={collapsed ? item.label : undefined}
      >
        <Icon size={18} aria-hidden="true" />
        <span className={collapsed ? "sr-only" : "truncate"}>{item.label}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`${classes} nav-item-disabled`}
      disabled
      aria-label={collapsed ? label : undefined}
      title={`${item.label} is planned for a future phase`}
    >
      <Icon size={18} aria-hidden="true" />
      <span className={collapsed ? "sr-only" : "truncate"}>{item.label}</span>
      {!collapsed ? <span className="sr-only">Planned for a future phase</span> : null}
    </button>
  );
}
