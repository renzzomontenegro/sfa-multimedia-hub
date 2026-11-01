"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileNavigationOpen) return;

    const previousFocus = document.activeElement;
    const drawer = mobileDrawerRef.current;
    const getFocusableElements = () => drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])',
    );
    getFocusableElements()?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileNavigationOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = getFocusableElements();
      if (!focusableElements?.length) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [mobileNavigationOpen]);

  return (
    <div className="dashboard-frame">
      <div className="desktop-sidebar">
        <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((value) => !value)} />
      </div>

      {mobileNavigationOpen ? (
        <div className="mobile-drawer-wrap">
          <button
            type="button"
            className="mobile-drawer-backdrop"
            onClick={() => setMobileNavigationOpen(false)}
            aria-label="Close navigation menu"
          />
          <div ref={mobileDrawerRef} id="mobile-navigation-drawer" className="mobile-drawer-panel" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <Sidebar
              collapsed={false}
              onToggleCollapse={() => setMobileNavigationOpen(false)}
              onNavigate={() => setMobileNavigationOpen(false)}
              isMobileDrawer
            />
          </div>
        </div>
      ) : null}

      <div className="dashboard-main">
        <Topbar onOpenNavigation={() => setMobileNavigationOpen((value) => !value)} navigationOpen={mobileNavigationOpen} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
