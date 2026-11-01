import type { ActivityEntry } from "@/types/dashboard";

type ActivityItemProps = {
  activity: ActivityEntry;
};

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <li className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
      <span className={`avatar avatar-${activity.color}`} aria-hidden="true">
        {activity.initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-6 text-foreground">
          <span className="font-medium">{activity.title}</span> {activity.description}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
      </div>
    </li>
  );
}
