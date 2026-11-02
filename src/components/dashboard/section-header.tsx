import type { ReactNode } from "react";

type SectionHeaderProps = {
  id?: string;
  descriptionId?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeader({ id, descriptionId, title, description, action }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 id={id} className="section-title">{title}</h2>
        {description ? <p id={descriptionId} className="section-description mt-1">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
