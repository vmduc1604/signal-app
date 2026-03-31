"use client";
import { useState, useEffect } from "react";
import SignalList from "../components/signals/SignalList";
import SignalCreationModal from "../components/signals/SignalCreationModal";
import { Signal, SignalForm } from "../types/signal";
import SignalEditModal from "../components/signals/SignalEditModal";
import { CircleCheck, Dot } from "lucide-react";
// const signalData = [
//   {
//     id: 1,
//     title: "Signal 1",
//     description: "This is the first signal.",
//     completed: false,
//     priority: "high",
//   },
//   {
//     id: 2,
//     title: "Signal 2",
//     description: "This is the second signal.",
//     completed: true,
//   },
//   {
//     id: 3,
//     title: "Signal 3",
//     description: "This is the third signal.",
//     completed: false,
//   },
// ];
export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const todaySignals = signals.filter((s) => !s.completed);
  const archivedSignals = signals.filter((s) => s.completed);

  const toggleSignal = (id: number) => {
    setSignals((prev) => {
      const target = prev.find((signal) => signal.id === id);
      if (!target) return prev;
      const updated = { ...target, completed: !target.completed };
      const rest = prev.filter((signal) => signal.id !== id);
      if (target.completed) {
        return [...rest, updated];
      } else {
        return [updated, ...rest];
      }
    });
  };

  const deleteSignal = (id: number) => {
    setSignals((prev) => prev.filter((signal) => signal.id !== id));
  };

  const updateSignal = (id: number, data: Partial<Signal>) => {
    setSignals((prev) =>
      prev.map((signal) =>
        signal.id === id ? { ...signal, ...data } : signal,
      ),
    );
  };
  const handleEdit = (signal: Signal) => {
    setSelectedSignal(signal);
    setIsEditModalOpen(true);
  };

  const createSignal = (data: SignalForm) => {
    const newSignal = {
      id: Date.now(),
      ...data,
      completed: false,
    };

    setSignals((prev) => [newSignal, ...prev]);
    setIsCreationModalOpen(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem("signals");
    if (stored) {
      setSignals(JSON.parse(stored));
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    localStorage.setItem("signals", JSON.stringify(signals));
  }, [signals, hasLoaded]);

  return (
    <>
      <div className="flex-1  p-6 md:p-10justify-center items-center">
        <main className="min-h-screen  items-center justify-center ">
          <div className=" flex flex-col ">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-slate-900 dark:text-white text-4xl font-bold leading-tight mb-2">
                  Mission Control
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-body text-base">
                  Focus on your current signals to reach the destination.
                </p>
              </div>
              <button
                className="bg-(--primary) hover:bg-(--primary-dark) cursor-pointer text-white px-6 py-3 rounded-4xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                onClick={() => setIsCreationModalOpen(true)}
              >
                + New Signal
              </button>
            </div>
            <div className="signals-management-container grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="signals-today flex-1">
                <div className="signal-today-header flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1">
                    <Dot className="w-4 h-4 text-(--primary) bg-(--primary)/30 rounded-full " />
                    <h2>Today's Signals </h2>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-[#223149] text-slate-600 dark:text-slate-400">
                    {todaySignals.length} Active
                  </span>
                </div>
                <SignalList
                  signals={todaySignals}
                  onToggle={toggleSignal}
                  onDelete={deleteSignal}
                  onEdit={handleEdit}
                />
              </div>
              <div className="signals-archived  flex-1 ">
                <div className="signal-archived-header flex justify-between items-center mb-4">
                  <div className="flex gap-1 items-center  font-medium">
                    <CircleCheck className="w-4 h-4 text-(--color-emerald-400)" />
                    <h2>Archived Signals</h2>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    {archivedSignals.length} Completed
                  </span>
                </div>
                <SignalList
                  signals={archivedSignals}
                  onToggle={toggleSignal}
                  onDelete={deleteSignal}
                  onEdit={handleEdit}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      {isCreationModalOpen && (
        <SignalCreationModal
          onClose={() => setIsCreationModalOpen(false)}
          onCreateSignal={(data) => {
            createSignal(data);
          }}
        />
      )}
      {isEditModalOpen && selectedSignal && (
        <SignalEditModal
          signal={selectedSignal}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateSignal={updateSignal}
        />
      )}
    </>
  );
}
