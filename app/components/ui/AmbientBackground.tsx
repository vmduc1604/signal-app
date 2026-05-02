"use client";
import { useEffect, useState } from "react";
import { usePomodoro } from "../../context/PomodoroContext";
import { motion } from "framer-motion";

// Helper to generate static particles on client to avoid hydration mismatch
const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.1,
    duration: Math.random() * 20 + 20, // 20-40s
    delay: Math.random() * -20, // start at different points
  }));
};

export default function AmbientBackground() {
  const { isRunning, mode } = usePomodoro();
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(generateParticles(30));
  }, []);

  const isDeepFocus = isRunning && mode === "session";
  const isBreak = isRunning && mode === "break";

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {/* Base Dark Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] to-[#050810]"
        animate={{
          opacity: isDeepFocus ? 1 : 0.9,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Mood Overlay based on timer state */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          background: isDeepFocus
            ? "radial-gradient(circle at 50% 50%, rgba(60, 131, 246, 0.05) 0%, transparent 70%)"
            : isBreak
            ? "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.05) 0%, transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%)",
          opacity: isRunning ? 1 : 0.5,
        }}
        transition={{ duration: 2 }}
      />

      {/* Drifting Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isDeepFocus ? p.opacity * 0.3 : p.opacity,
            y: ["-5vh", "-105vh"], // Float slowly upwards
            x: ["0vw", "5vw", "-5vw", "0vw"], // Subtle sway
          }}
          transition={{
            opacity: { duration: 2 },
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            x: {
              duration: p.duration * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
          }}
        />
      ))}

      {/* Vignette effect for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,16,0.8)_100%)] mix-blend-multiply" />
    </div>
  );
}
