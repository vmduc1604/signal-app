"use client";
import { useState, useEffect } from "react";
import { formatTime } from "../../utils/formatTime";
import { PomodoroSettings } from "../../types/pomodoro";
import PomodoroSettingModal from "./PomodoroSettingModal";
import { Play, Pause, Settings, RotateCcw, Timer } from "lucide-react";

export default function Pomodoro() {
  const [time, setTime] = useState(() => {
    const stored = localStorage.getItem("pomodoroSettings");
    return stored ? JSON.parse(stored).sessionLength : 25 * 60;
  });

  const [isRunning, setIsRunning] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [mode, setMode] = useState<"session" | "break">("session");

  const [pomodoroSettings, setPomodoroSettings] = useState<PomodoroSettings>(
    () => {
      const stored = localStorage.getItem("pomodoroSettings");
      return stored
        ? JSON.parse(stored)
        : { sessionLength: 25 * 60, breakLength: 5 * 60 };
    },
  );

  const { sessionLength, breakLength } = pomodoroSettings;
  const [completedPomodoros, setCompletedPomodoros] = useState(() => {
    const stored = localStorage.getItem("completedPomodoros");
    return stored ? JSON.parse(stored) : { count: 0, totalTime: 0 };
  });

  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const handleUpdateSettings = (session: number, breakTime: number) => {
    setPomodoroSettings((prev) => ({
      ...prev,
      sessionLength: session,
      breakLength: breakTime,
    }));
    setTime(session);
    setIsRunning(false);
    setIsSettingModalOpen(false);
  };
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

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
  }, [time]);

  useEffect(() => {
    const stored = localStorage.getItem("completedPomodoros");
    const settings = localStorage.getItem("pomodoroSettings");
    if (settings) {
      setPomodoroSettings(JSON.parse(settings));
      setTime(JSON.parse(settings).sessionLength);
    }
    if (stored) {
      setCompletedPomodoros(JSON.parse(stored));
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("pomodoroSettings", JSON.stringify(pomodoroSettings));
    localStorage.setItem(
      "completedPomodoros",
      JSON.stringify(completedPomodoros),
    );
  }, [pomodoroSettings, completedPomodoros, hasLoaded]);
  return (
    <>
      <div className="text-6xl font-medium text-center">{formatTime(time)}</div>
      <p className="text-center text-(--primary) mt-2 flex items-center justify-center gap-2">
        {mode === "session" ? (
          <>
            <Timer className="w-4 h-4" />
            <span>Focus Session</span>
          </>
        ) : (
          "Break"
        )}
      </p>
      <div className="flex items-center justify-center gap-6 pt-2">
        {/* Reset */}
        <button
          className="secondary-control hover:bg-(--primary)/25 cursor-pointer transition-colors rounded-full p-2"
          title="Reset Session"
          onClick={() => {
            setTime(sessionLength);
            setIsRunning(false);
          }}
        >
          <RotateCcw className="w-7 h-7" />
        </button>

        {/* Play / Pause (Main Button) */}
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="group relative inline-flex items-center justify-center size-20 md:size-24 bg-(--primary) text-white rounded-full glow-effect overflow-hidden"
        >
          <span className="relative z-10 flex items-center">
            {isRunning ? (
              <Pause
                className="w-10 h-10 md:w-12 md:h-12"
                fill="currentColor"
                stroke="none"
              />
            ) : (
              <Play
                className="w-10 h-10 md:w-12 md:h-12"
                fill="currentColor"
                stroke="none"
              />
            )}
          </span>

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
        </button>

        {/* Settings */}
        <button
          className="secondary-control hover:bg-(--primary)/25 cursor-pointer transition-colors rounded-full p-2"
          title="Timer Settings"
          onClick={() => setIsSettingModalOpen(true)}
        >
          <Settings className="w-7 h-7" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div>Pomodoros: {completedPomodoros.count}</div>

        <div className="">
          Focus Time: {(completedPomodoros.totalTime / 3600).toFixed(2)} hours
        </div>
      </div>
      {isSettingModalOpen && (
        <PomodoroSettingModal
          sessionLength={sessionLength}
          breakLength={breakLength}
          onUpdate={handleUpdateSettings}
          onClose={() => setIsSettingModalOpen(false)}
        ></PomodoroSettingModal>
      )}
    </>
  );
}
