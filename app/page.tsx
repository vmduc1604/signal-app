"use client";
import { motion, AnimatePresence } from "framer-motion";
import MoonDisplay from "./components/focus/MoonDisplay";
import Pomodoro from "./components/focus/Pomodoro";
import Quotes from "./components/focus/Quotes";
import { usePomodoro } from "./context/PomodoroContext";

export default function Home() {
  const { isRunning, mode } = usePomodoro();
  const isDeepFocus = isRunning && mode === "session";

  // Framer Motion variants for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-12 relative z-10 overflow-hidden">
      <motion.div 
        className="w-full max-w-5xl flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="wait">
          {!isDeepFocus && (
            <motion.div
              key="quotes"
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              className="w-full"
            >
              <Quotes />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={itemVariants} className="w-full">
          <MoonDisplay />
        </motion.div>

        <motion.div variants={itemVariants} className="w-full relative z-20">
          <Pomodoro />
        </motion.div>
      </motion.div>
    </main>
  );
}
