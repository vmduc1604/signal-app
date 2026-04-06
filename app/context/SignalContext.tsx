"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Signal, SignalForm } from "../types/signal";

type SignalContextType = {
  signals: Signal[];
  createSignal: (data: SignalForm) => void;
  deleteSignal: (id: number) => void;
  toggleSignal: (id: number) => void;
  updateSignal: (id: number, data: Partial<Signal>) => void;
};

const SignalContext = createContext<SignalContextType | null>(null);

export const SignalProvider = ({ children }: { children: React.ReactNode }) => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const toggleSignal = (id: number) => {
    setSignals((prev) => {
      const target = prev.find((s) => s.id === id);
      if (!target) return prev;
      const updated = { ...target, completed: !target.completed };
      const rest = prev.filter((s) => s.id !== id);
      return target.completed ? [...rest, updated] : [updated, ...rest];
    });
  };

  const deleteSignal = (id: number) => {
    setSignals((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSignal = (id: number, data: Partial<Signal>) => {
    setSignals((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s)),
    );
  };

  const createSignal = (data: SignalForm) => {
    const newSignal: Signal = { id: Date.now(), ...data, completed: false };
    setSignals((prev) => [newSignal, ...prev]);
  };

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("signals");
    if (stored) setSignals(JSON.parse(stored));
    setHasLoaded(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("signals", JSON.stringify(signals));
  }, [signals, hasLoaded]);

  return (
    <SignalContext.Provider
      value={{
        signals,
        createSignal,
        deleteSignal,
        toggleSignal,
        updateSignal,
      }}
    >
      {children}
    </SignalContext.Provider>
  );
};

export const useSignal = () => {
  const ctx = useContext(SignalContext);
  if (!ctx) throw new Error("useSignal must be used inside SignalProvider");
  return ctx;
};
