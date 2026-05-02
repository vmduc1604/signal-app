"use client";
import { useState, useRef, useEffect } from "react";
import { SignalForm } from "@/app/types/signal";
import {
  Target,
  AlignLeft,
  Flag,
  Zap,
  Tag,
} from "lucide-react";

export default function SignalCreationModal({
  folderId,
  onClose,
  onCreateSignal,
}: {
  folderId: number;
  onClose: () => void;
  onCreateSignal: (data: SignalForm) => void;
}) {
  const [formData, setFormData] = useState<SignalForm>({
    title: "",
    description: "",
    priority: "high",
    tag: "",
    folderId,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return; // Prevent empty title
    onCreateSignal(formData);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      if (formData.title.trim()) {
        onCreateSignal(formData);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-xl bg-[rgba(16,23,34,0.8)] backdrop-blur-[12px] rounded-4xl shadow-2xl overflow-hidden border border-slate-800 dark:border-primary/20 p-6 relative shadow-xl">
        <div className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-100">
              New Signal
            </h2>
          </div>
          <p className="text-slate-400 text-sm">
            Define parameters for this new task. Use <kbd className="font-mono text-xs bg-slate-800 px-1 rounded text-slate-300">Cmd + Enter</kbd> to launch.
          </p>
        </div>
        {/* Form Body */}
        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              {<Target className="w-4 h-4 text-(--primary)" />}
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                Objective
              </label>
            </div>
            <input
              name="title"
              type="text"
              autoFocus
              placeholder="E.g., Complete quarterly review"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-700 focus:border-(--primary) focus:ring-1 focus:ring-(--primary) rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 transition-all outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
              {<AlignLeft className="w-4 h-4 text-(--primary)" />}
              Details
            </label>
            <textarea
              name="description"
              placeholder="Additional context or steps..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-slate-900/50 border border-slate-700 focus:border-(--primary) focus:ring-1 focus:ring-(--primary) rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 min-h-[100px] transition-all outline-none resize-none"
            />
          </div>
          
          {/* Tags and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                {<Tag className="w-4 h-4 text-(--primary)" />}
                Category Tag
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  name="tag"
                  type="text"
                  placeholder="e.g. Design, API..."
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 focus:border-(--primary) focus:ring-1 focus:ring-(--primary) rounded-xl px-4 py-2 text-slate-100 placeholder:text-slate-600 transition-all outline-none"
                />
              </div>
            </div>
            {/* Priority */}
            <div className="flex flex-col space-between gap-2">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                {<Flag className="w-4 h-4 text-(--primary)" />}
                Priority Level
              </label>
              <div className="flex h-11 w-full items-center justify-center rounded-xl bg-slate-900/80 p-1 border border-slate-700">
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-slate-700 has-[:checked]:text-white text-slate-500 text-xs font-bold transition-all hover:bg-slate-800">
                  <span>LOW</span>
                  <input
                    className="hidden"
                    name="priority"
                    type="radio"
                    value="low"
                    onChange={handleChange}
                    checked={formData.priority === "low"}
                  />
                </label>
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-slate-700 has-[:checked]:text-white text-slate-500 text-xs font-bold transition-all hover:bg-slate-800">
                  <span>MED</span>
                  <input
                    className="hidden"
                    name="priority"
                    type="radio"
                    value="medium"
                    onChange={handleChange}
                    checked={formData.priority === "medium"}
                  />
                </label>
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-(--primary) has-[:checked]:text-white text-slate-500 text-xs font-bold transition-all hover:bg-slate-800">
                  <span>HIGH</span>
                  <input
                    className="hidden"
                    name="priority"
                    type="radio"
                    value="high"
                    onChange={handleChange}
                    checked={formData.priority === "high"}
                  />
                </label>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-6 mt-2 border-t border-slate-800/50">
            <button
              className="flex-1 bg-(--primary) hover:bg-(--primary-dark) text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={!formData.title.trim()}
            >
              <span>Launch Signal</span>
              <Zap className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
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
  );
}
