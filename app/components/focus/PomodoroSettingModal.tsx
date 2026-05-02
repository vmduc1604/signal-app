"use client";
import { useState } from "react";
import { Slider } from "@mui/material";

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData.sessionLength * 60, formData.breakLength * 60);
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
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
        <div className="relative w-full max-w-xl bg-[rgba(16,23,34,0.8)] backdrop-blur-[12px] border border-[rgba(60,131,246,0.2)] rounded-4xl shadow-2xl overflow-hidden border border-slate-800 dark:border-primary/20 p-6 w-full max-w-md relative shadow-xl">
          <div className=" pb-2">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-100">
                Signal configuration
              </h2>
            </div>
            <p className="text-slate-400 text-sm">
              Set your rhythm for deep focus.
            </p>
          </div>
          {/* Form Body */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                <img
                  src="/signal-3-svgrepo-com.svg"
                  alt="Signal"
                  className="w-6 h-6 opacity-70 hover:opacity-100  transition-opacity"
                />
                Pomodoro session duration (minutes)
              </label>
              <div className="session-duration-slider flex gap-5 items-center">
                <span>5</span>
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
                />
                <span>60</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                <img
                  src="/signal-3-svgrepo-com.svg"
                  alt="Signal"
                  className="w-6 h-6 opacity-70 hover:opacity-100  transition-opacity"
                />
                Break duration (minutes)
              </label>
              <div className="session-duration-slider flex gap-5 items-center">
                <span>5</span>
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
                />
                <span>30</span>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button className="cursor-pointer" onClick={onClose}>
                Cancel
              </button>
              <button
                className="w-full sm:flex-1 bg-(--primary) hover:bg-(--primary)/90 text-white font-bold py-4 rounded-4xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 group cursor-pointer"
                type="submit"
              >
                <span>Update Pomodoro</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  send
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
