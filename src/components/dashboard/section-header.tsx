import type { ReactNode } from "react";

type SectionHeaderProps = {
  id?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeader({ id, title, description, action }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div>
        <h2 id={id} className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
