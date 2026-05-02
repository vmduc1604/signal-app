"use client";
import { useState, useRef, useEffect } from "react";
import { Slider } from "@mui/material";
import { Timer, Coffee, Check } from "lucide-react";
import { createPortal } from "react-dom";

export default function PomodoroSettingModal({
  sessionLength,
  breakLength,
  onUpdate,
  onClose,
}: {
  sessionLength: number;
  breakLength: number;
  onUpdate: (session: number, breakTime: number) => void;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData.sessionLength * 60, formData.breakLength * 60);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      onUpdate(formData.sessionLength * 60, formData.breakLength * 60);
      onClose();
    }
  };

  const [formData, setFormData] = useState({
    sessionLength: sessionLength / 60,
    breakLength: breakLength / 60,
  });

  const handleSliderChange =
    (name: "sessionLength" | "breakLength") =>
    (_: Event, value: number | number[]) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value as number,
      }));
    };

  if (!mounted) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
        <div className="relative w-full max-w-xl bg-[rgba(16,23,34,0.8)] backdrop-blur-[12px] rounded-4xl shadow-2xl overflow-hidden border border-slate-800 dark:border-primary/20 p-6 relative shadow-xl">
          <div className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-100">
                Timer Settings
              </h2>
            </div>
            <p className="text-slate-400 text-sm">
              Set your rhythm for deep focus. Use{" "}
              <kbd className="font-mono text-xs bg-slate-800 px-1 rounded text-slate-300">
                Cmd + Enter
              </kbd>{" "}
              to save.
            </p>
          </div>

          {/* Form Body */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className="space-y-6"
          >
            <div className="flex flex-col gap-3">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                <Timer className="w-4 h-4 text-(--primary)" />
                Focus Session Duration (minutes)
              </label>
              <div className="flex gap-5 items-center bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2">
                <span className="text-slate-400 text-sm font-medium w-4 text-center">
                  5
                </span>
                <Slider
                  name="sessionLength"
                  value={formData.sessionLength}
                  onChange={handleSliderChange("sessionLength")}
                  getAriaValueText={(value) => `${value} minutes`}
                  valueLabelDisplay="auto"
                  shiftStep={30}
                  step={5}
                  marks
                  min={5}
                  max={60}
                  sx={{
                    color: "var(--primary)",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "var(--primary)",
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "var(--primary)",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#334155",
                    },
                  }}
                />
                <span className="text-slate-400 text-sm font-medium w-6 text-center">
                  60
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                <Coffee className="w-4 h-4 text-(--primary)" />
                Break Duration (minutes)
              </label>
              <div className="flex gap-5 items-center bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2">
                <span className="text-slate-400 text-sm font-medium w-4 text-center">
                  5
                </span>
                <Slider
                  name="breakLength"
                  value={formData.breakLength}
                  onChange={handleSliderChange("breakLength")}
                  getAriaValueText={(value) => `${value} minutes`}
                  valueLabelDisplay="auto"
                  shiftStep={30}
                  step={5}
                  marks
                  min={5}
                  max={30}
                  sx={{
                    color: "var(--primary)",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "var(--primary)",
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "var(--primary)",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#334155",
                    },
                  }}
                />
                <span className="text-slate-400 text-sm font-medium w-6 text-center">
                  30
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-6 mt-2 border-t border-slate-800/50">
              <button
                className="flex-1 bg-(--primary) hover:bg-(--primary-dark) text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 group cursor-pointer"
                type="submit"
              >
                <span>Save Settings</span>
                <Check className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>
              <button
                className="px-6 py-3.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl font-medium transition-colors cursor-pointer"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}
