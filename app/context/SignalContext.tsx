"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Signal, SignalForm, Folder } from "../types/signal";

type SignalContextType = {
  signals: Signal[];
  folders: Folder[];
  createSignal: (data: SignalForm) => void;
  deleteSignal: (id: number) => void;
  toggleSignal: (id: number) => void;
  updateSignal: (id: number, data: Partial<Signal>) => void;
  createFolder: (name: string) => void;
  deleteFolder: (id: number) => void;
};

const SignalContext = createContext<SignalContextType | null>(null);

export const SignalProvider = ({ children }: { children: React.ReactNode }) => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [folders, setFolders] = useState<Folder[]>([{ id: 0, name: "Inbox" }]);
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
    const newSignal: Signal = { 
      id: Date.now(), 
      ...data, 
      completed: false,
      folderId: data.folderId ?? 0 // default to Inbox (0) if none provided
    };
    setSignals((prev) => [newSignal, ...prev]);
  };

  const createFolder = (name: string) => {
    const newFolder: Folder = { id: Date.now(), name };
    setFolders((prev) => [...prev, newFolder]);
  };

  const deleteFolder = (id: number) => {
    if (id === 0) return; // Cannot delete Inbox
    setFolders((prev) => prev.filter((f) => f.id !== id));
    // Optionally: delete all signals in that folder, or move them to Inbox.
    setSignals((prev) => prev.map(s => s.folderId === id ? { ...s, folderId: 0 } : s));
  };

  // Load from localStorage
  useEffect(() => {
    const storedSignals = localStorage.getItem("signals");
    if (storedSignals) {
      // Migrate old signals that don't have a folderId to Inbox (0)
      const parsed = JSON.parse(storedSignals).map((s: Signal) => ({
        ...s,
        folderId: s.folderId !== undefined ? s.folderId : 0
      }));
      setSignals(parsed);
    }
    
    const storedFolders = localStorage.getItem("folders");
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
    
    setHasLoaded(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("signals", JSON.stringify(signals));
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [signals, folders, hasLoaded]);

  return (
    <SignalContext.Provider
      value={{
        signals,
        folders,
        createSignal,
        deleteSignal,
        toggleSignal,
        updateSignal,
        createFolder,
        deleteFolder,
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
