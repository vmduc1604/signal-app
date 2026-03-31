import { Signal } from "@/app/types/signal";

export default function SignalCard({
  signal,
  onToggle,
  onDelete,
  onEdit,
}: {
  signal: Signal;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (signal: Signal) => void;
}) {
  return (
    <div className="bg-(--card-dark) rounded-lg p-4 w-full border border-slate-200 border-white/10 hover:border-(--primary)/50 dark:hover:border-primary/50 transition-all cursor-pointer shadow-md shadow-primary/10 transform hover:-translate-y-0.25 transition-all">
      {signal.priority && (
        <div className="flex items-start gap-2 mb-3 relative">
          <span className="px-2 py-1 rounded-md bg-(--primary)/10 text-(--primary) text-xs font-semibold uppercase tracking-wider">
            {signal.priority.toUpperCase()} PRIORITY
          </span>
          {signal.tag && (
            <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-xs font-medium">
              {signal.tag.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">{signal.title || "N/A"}</h2>
      <p className="text-gray-400 mb-4">{signal.description}</p>
      <button
        onClick={() => onToggle(signal.id)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {signal.completed ? "Mark Active" : "Mark Completed"}
      </button>
      <button
        onClick={() => onDelete(signal.id)}
        className="ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
      >
        X
      </button>
      <button
        onClick={() => onEdit(signal)}
        className="ml-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
      >
        Edit
      </button>
    </div>
  );
}
