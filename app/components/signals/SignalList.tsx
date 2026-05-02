import SignalCard from "./SignalCard";
import { Signal } from "@/app/types/signal";
import { EmptyState } from "../ui/EmptyState";
import { ClipboardList } from "lucide-react";

export default function SignalList({
  signals,
  onToggle,
  onDelete,
  onEdit,
  onClickSignal,
}: {
  signals: Signal[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (signal: Signal) => void;
  onClickSignal: (signal: Signal) => void;
}) {
  if (signals.length === 0) {
    return (
      <EmptyState
        icon={<ClipboardList className="w-8 h-8 opacity-50" />}
        title="No signals found"
        description="There are currently no signals in this view. Create a new one to get started."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {signals.map((signal) => (
        <SignalCard
          key={signal.id}
          signal={signal}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onClickSignal={onClickSignal}
        />
      ))}
    </div>
  );
}
