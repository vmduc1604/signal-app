"use client";
import { useState } from "react";
import SignalList from "../components/signals/SignalList";
import SignalCreationModal from "../components/signals/SignalCreationModal";
import SignalEditModal from "../components/signals/SignalEditModal";
import { SignalDrawer } from "../components/signals/SignalDrawer";
import { useSignal } from "../context/SignalContext";
import { Signal } from "../types/signal";
import { CircleCheck, Dot } from "lucide-react";
import { usePomodoro } from "../context/PomodoroContext";
import { formatTime } from "../utils/formatTime";

export default function SignalsPage() {
  const { signals, createSignal, deleteSignal, toggleSignal, updateSignal } =
    useSignal();
  const { time } = usePomodoro();
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const todaySignals = signals.filter((s) => !s.completed);
  const archivedSignals = signals.filter((s) => s.completed);

  const handleClick = (signal: Signal) => {
    setSelectedSignal(signal);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="flex-1 p-6 md:p-10 justify-center items-center relative">
        <main className="min-h-screen items-center justify-center">
          <div className="flex flex-col">
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
            <div className="signals-management-container grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
              <div className="signals-today flex-1 flex flex-col min-h-0">
                <div className="signal-today-header flex justify-between items-center mb-4 sticky top-0 bg-background-dark z-10 pb-2">
                  <div className="flex items-center gap-1">
                    <Dot className="w-4 h-4 text-(--primary) bg-(--primary)/30 rounded-full" />
                    <h3 className="text-lg font-semibold text-slate-200">Today's Signals</h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-400">
                    {todaySignals.length} Active
                  </span>
                </div>
                <SignalList
                  signals={todaySignals}
                  onToggle={toggleSignal}
                  onDelete={deleteSignal}
                  onEdit={() => {}} // Kept for type compatibility if not removed from SignalList
                  onClickSignal={handleClick}
                />
              </div>
              <div className="signals-archived flex-1 flex flex-col min-h-0">
                <div className="signal-archived-header flex justify-between items-center mb-4 sticky top-0 bg-background-dark z-10 pb-2">
                  <div className="flex gap-1 items-center font-semibold text-slate-200">
                    <CircleCheck className="w-4 h-4 text-(--color-emerald-400)" />
                    <h3 className="text-lg">Archived Signals</h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-900/20 text-emerald-500">
                    {archivedSignals.length} Completed
                  </span>
                </div>
                <SignalList
                  signals={archivedSignals}
                  onToggle={toggleSignal}
                  onDelete={deleteSignal}
                  onEdit={() => {}} // Kept for type compatibility
                  onClickSignal={handleClick}
                />
              </div>
            </div>
          </div>
        </main>
        <div className="time   font-bold text-3xl fixed bottom-4 right-4 text-gray-700">
          {formatTime(time)}
        </div>
      </div>

      {isCreationModalOpen && (
        <SignalCreationModal
          onClose={() => setIsCreationModalOpen(false)}
          onCreateSignal={(data) => {
            createSignal(data);
            setIsCreationModalOpen(false);
          }}
        />
      )}
      {/* {isEditModalOpen && selectedSignal && (
        <SignalEditModal
          signal={selectedSignal}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateSignal={updateSignal}
        />
      )} */}
      <SignalDrawer
        signal={selectedSignal}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        updateSignal={updateSignal}
      />
    </>
  );
}
