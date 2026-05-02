"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { usePomodoro } from "../../context/PomodoroContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 3D Moon Component
function ThreeMoon({ stateColor }: { stateColor: string }) {
  const moonRef = useRef<THREE.Mesh>(null);
  
  // High-res moon texture from three.js examples repository
  const colorMap = useTexture(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg"
  );

  // Auto-rotate the moon slowly
  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      {/* Dynamic Key Light that changes color based on focus state */}
      <directionalLight 
        position={[5, 3, 5]} 
        intensity={2.5} 
        color={stateColor} 
      />
      {/* Subtle fill light for shadows */}
      <directionalLight 
        position={[-5, -3, -5]} 
        intensity={0.5} 
        color="#1e293b" 
      />
      
      <mesh ref={moonRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          map={colorMap} 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </>
  );
}

export default function MoonDisplay() {
  const [isDesktop, setIsDesktop] = useState(true);
  const { isRunning, mode } = usePomodoro();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine glow color and animation parameters based on state
  const isDeepFocus = isRunning && mode === "session";
  const isBreak = isRunning && mode === "break";

  const glowColor = isDeepFocus
    ? "rgba(60, 131, 246, 0.4)" // Blue
    : isBreak
    ? "rgba(251, 191, 36, 0.4)" // Amber
    : "rgba(255, 255, 255, 0.1)"; // Default idle

  // Determine actual 3D light color
  const lightColor = isBreak
    ? "#fbbf24" // Warm Amber
    : "#ffffff"; // Crisp White (for both idle and deep focus)

  const glowScale = isRunning ? [1, 1.1, 1] : 1;
  const glowOpacity = isRunning ? [0.6, 1, 0.6] : 0.4;
  const animationDuration = isDeepFocus ? 4 : isBreak ? 6 : 0; // Breathing speed

  return (
    <div className="flex justify-center items-center my-12 relative">
      <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
        
        {/* Dynamic Breathing Ambient Glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-[80px] pointer-events-none"
          animate={{
            backgroundColor: glowColor,
            scale: glowScale,
            opacity: glowOpacity,
          }}
          transition={{
            backgroundColor: { duration: 2 },
            scale: {
              duration: animationDuration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: {
              duration: animationDuration,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />

        {/* The 3D Moon Canvas */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 z-10 cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ThreeMoon stateColor={lightColor} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate={false} 
            />
          </Canvas>
        </div>

        {/* Outer Orbit */}
        {isDesktop && (
          <motion.div 
            className="absolute w-[100%] h-[100%] border border-slate-200/20 dark:border-white/5 rounded-full z-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <motion.div 
              className="absolute top-1/2 -right-1 w-2 h-2 rounded-full shadow-lg"
              animate={{
                backgroundColor: isDeepFocus ? "#3b82f6" : isBreak ? "#fbbf24" : "#ffffff",
                boxShadow: `0 0 10px ${isDeepFocus ? "#3b82f6" : isBreak ? "#fbbf24" : "#ffffff"}`
              }}
              transition={{ duration: 2 }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
