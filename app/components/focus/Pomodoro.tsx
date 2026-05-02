"use client";
import { useState, useEffect } from "react";
import { usePomodoro } from "../../context/PomodoroContext";
import { formatTime } from "../../utils/formatTime";
import PomodoroSettingModal from "./PomodoroSettingModal";
import { Play, Pause, Settings, RotateCcw, Timer } from "lucide-react";
import { motion } from "framer-motion";

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
  const isDeepFocus = isRunning && mode === "session";

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTargetScale = () => {
    if (!isDeepFocus) return 1;
    if (windowWidth < 640) return 2.5; // Mobile
    if (windowWidth < 1024) return 3.5; // Tablet
    return 5; // Desktop
  };

  const getTargetY = () => {
    if (!isDeepFocus) return 0;
    if (windowWidth < 768) return -220; // Slide up less on mobile due to smaller moon
    return -320; // Desktop
  };

  return (
    <>
      {/* Container with fixed height prevents layout collapse */}
      <div className="relative flex justify-center items-center h-24 mb-6 z-0">
        <motion.div
          className="timer font-bold text-center pointer-events-none absolute"
          animate={{
            y: getTargetY(),
            scale: getTargetScale(),
            opacity: isDeepFocus ? 0.15 : 1, // Fade into the background
          }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-7xl md:text-8xl tracking-tighter drop-shadow-lg tabular-nums">
            {formatTime(time)}
          </div>
        </motion.div>
      </div>

      {/* Action Buttons & Info Container */}
      {/* 
        This container blurs out and fades away when deep focus starts.
        However, if the user hovers over the bottom area, it gracefully reveals itself so they can pause.
      */}
      <motion.div
        className="flex flex-col items-center gap-4 relative z-20"
        animate={{
          opacity: isDeepFocus ? 0.3 : 1,
          filter: isDeepFocus ? "blur(2px)" : "blur(0px)",
        }}
        whileHover={{
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <p className="text-center text-(--primary) flex items-center justify-center gap-2 font-medium">
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
            className="text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors rounded-full p-3"
            title="Reset Session"
            onClick={resetTimer}
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="group relative inline-flex items-center justify-center size-20 md:size-24 bg-(--primary) text-white rounded-full overflow-hidden shadow-[0_0_40px_rgba(60,131,246,0.3)] hover:scale-105 transition-transform"
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
                  className="w-10 h-10 md:w-12 md:h-12 translate-x-1"
                  fill="currentColor"
                  stroke="none"
                />
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </button>

          <button
            className="text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors rounded-full p-3"
            title="Timer Settings"
            onClick={() => setIsSettingModalOpen(true)}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 mt-6 text-sm font-medium text-slate-500">
          <div className="flex flex-col items-center gap-1">
            <span className="text-slate-300 text-lg">
              {completedPomodoros.count}
            </span>
            <span className="uppercase text-[10px] tracking-widest">
              Sessions
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-slate-300 text-lg">
              {(completedPomodoros.totalTime / 3600).toFixed(1)}
            </span>
            <span className="uppercase text-[10px] tracking-widest">Hours</span>
          </div>
        </div>
      </motion.div>

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
