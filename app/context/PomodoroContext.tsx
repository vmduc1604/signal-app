"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { PomodoroSettings } from "../types/pomodoro";

type CompletedPomodoros = {
  count: number;
  totalTime: number;
};

type PomodoroContextType = {
  time: number;
  isRunning: boolean;
  mode: "session" | "break";
  pomodoroSettings: PomodoroSettings;
  completedPomodoros: CompletedPomodoros;
  isSettingModalOpen: boolean;
  setIsRunning: (val: boolean) => void;
  setIsSettingModalOpen: (val: boolean) => void;
  handleUpdateSettings: (session: number, breakTime: number) => void;
  resetTimer: () => void;
};

const PomodoroContext = createContext<PomodoroContextType | null>(null);

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pomodoroSettings, setPomodoroSettings] = useState<PomodoroSettings>({
    sessionLength: 25 * 60,
    breakLength: 5 * 60,
  });

  const [time, setTime] = useState(25 * 60);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"session" | "break">("session");
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] =
    useState<CompletedPomodoros>({
      count: 0,
      totalTime: 0,
    });

  const { sessionLength, breakLength } = pomodoroSettings;

  // Timer interval
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTime((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Timer completion
  useEffect(() => {
    if (time > 0) return;
    if (mode === "session") {
      setCompletedPomodoros((p) => ({
        count: p.count + 1,
        totalTime: p.totalTime + sessionLength,
      }));
      setMode("break");
      setTime(breakLength);
    } else {
      setMode("session");
      setTime(sessionLength);
    }
  }, [time, mode, sessionLength, breakLength]);

  const handleUpdateSettings = (session: number, breakTime: number) => {
    setPomodoroSettings({ sessionLength: session, breakLength: breakTime });
    setTime(session);
    setMode("session"); // ✅ bug fix
    setIsRunning(false);
    setIsSettingModalOpen(false);
  };

  const resetTimer = () => {
    setTime(sessionLength);
    setIsRunning(false);
  };
  
  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("completedPomodoros");
    const settings = localStorage.getItem("pomodoroSettings");
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setPomodoroSettings(parsedSettings);
      setTime(parsedSettings.sessionLength);
    }
    if (stored) setCompletedPomodoros(JSON.parse(stored));
    setHasLoaded(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem(
      "completedPomodoros",
      JSON.stringify(completedPomodoros),
    );
    localStorage.setItem("pomodoroSettings", JSON.stringify(pomodoroSettings));
  }, [completedPomodoros, hasLoaded, pomodoroSettings]);
  return (
    <PomodoroContext.Provider
      value={{
        time,
        isRunning,
        mode,
        pomodoroSettings,
        completedPomodoros,
        isSettingModalOpen,
        setIsRunning,
        setIsSettingModalOpen,
        handleUpdateSettings,
        resetTimer,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const ctx = useContext(PomodoroContext);
  if (!ctx) throw new Error("usePomodoro must be used inside PomodoroProvider");
  return ctx;
};
