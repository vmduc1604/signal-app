"use client";
import { usePomodoro } from "../../context/PomodoroContext";
import { formatTime } from "../../utils/formatTime";
import PomodoroSettingModal from "./PomodoroSettingModal";
import { Play, Pause, Settings, RotateCcw, Timer } from "lucide-react";

export default function Pomodoro() {
  const {
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
  } = usePomodoro();

  const { sessionLength, breakLength } = pomodoroSettings;

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
        <button
          className="secondary-control hover:bg-(--primary)/25 cursor-pointer transition-colors rounded-full p-2"
          title="Reset Session"
          onClick={resetTimer}
        >
          <RotateCcw className="w-7 h-7" />
        </button>

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
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        </button>

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
        <div>
          Focus Time: {(completedPomodoros.totalTime / 3600).toFixed(2)} hours
        </div>
      </div>

      {isSettingModalOpen && (
        <PomodoroSettingModal
          sessionLength={sessionLength}
          breakLength={breakLength}
          onUpdate={handleUpdateSettings}
          onClose={() => setIsSettingModalOpen(false)}
        />
      )}
    </>
  );
}
