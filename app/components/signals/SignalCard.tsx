import { Signal } from "@/app/types/signal";
import { Circle, CircleCheck, Trash2 } from "lucide-react";

export default function SignalCard({
  signal,
  onToggle,
  onDelete,
  onEdit,
  onClickSignal,
}: {
  signal: Signal;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (signal: Signal) => void;
  onClickSignal: (signal: Signal) => void;
}) {
  const priorityStyles = {
    low: "bg-slate-500",
    medium: "bg-blue-500",
    high: "bg-orange-500",
  };

  return (
    <div
      className={`group relative flex items-start gap-4 p-4 w-full rounded-xl border transition-all cursor-pointer select-none
        ${
          signal.completed
            ? "bg-slate-900/40 border-slate-800/50 hover:bg-slate-900/60"
            : "bg-slate-900/80 border-slate-700/50 hover:border-(--primary)/30 hover:bg-slate-800/80 shadow-sm"
        }
      `}
      onClick={() => onClickSignal(signal)}
    >
      {/* Custom Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(signal.id);
        }}
        className="mt-1 flex-shrink-0 text-slate-500 hover:text-(--primary) transition-colors focus:outline-none"
        aria-label={signal.completed ? "Mark as active" : "Mark as completed"}
      >
        {signal.completed ? (
          <CircleCheck className="w-5 h-5 text-(--primary)" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      {/* Card Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {signal.priority && (
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityStyles[signal.priority as keyof typeof priorityStyles]}`}
              title={`${signal.priority} priority`}
            />
          )}
          <h3
            className={`text-base font-semibold truncate ${
              signal.completed ? "text-slate-500 line-through" : "text-slate-200"
            }`}
          >
            {signal.title || "Untitled Signal"}
          </h3>
          {signal.tag && (
            <span className="ml-2 px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-medium tracking-wide uppercase flex-shrink-0">
              {signal.tag}
            </span>
          )}
        </div>
        
        {signal.description && (
          <p className="text-sm text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {signal.description}
          </p>
        )}
      </div>

      {/* Hover Actions */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center absolute right-4 top-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(signal.id);
          }}
          className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
          aria-label="Delete Signal"
          title="Delete Signal"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
