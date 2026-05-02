import { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/30 border border-slate-800/50 border-dashed rounded-xl w-full">
      {icon && <div className="mb-4 text-slate-600">{icon}</div>}
      <h3 className="text-sm font-semibold text-slate-300">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-slate-500 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
