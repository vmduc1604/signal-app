import SignalCard from "./SignalCard";
import { Signal } from "@/app/types/signal";
export default function SignalList({
  signals,
  onToggle,
  onDelete,
  onEdit,
}: {
  signals: Signal[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (signal: Signal) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6">
      {signals.map((signal) => (
        <SignalCard
          key={signal.id}
          signal={signal}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
