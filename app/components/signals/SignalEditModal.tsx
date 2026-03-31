"use client";
import { useState } from "react";
import { Signal, SignalForm } from "@/app/types/signal";

export default function SignalEditModal({
  signal,
  onClose,
  onUpdateSignal,
}: {
  signal: Signal;
  onClose: () => void;
  onUpdateSignal: (id: number, data: SignalForm) => void;
}) {
  const [formData, setFormData] = useState<SignalForm>({
    title: signal.title,
    description: signal.description,
    priority: signal.priority,
    tag: signal.tag,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSignal(signal.id, formData);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold mb-6">Create New Signal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              type="text"
              placeholder="Signal Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="description"
              placeholder="Signal Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">
                  priority_high
                </span>
                Priority Level
              </label>
              <div className="flex h-10 w-full items-center justify-center rounded-lg bg-slate-900/80 p-1 border border-slate-700">
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 has-[:checked]:bg-(--primary) has-[:checked]:text-white text-slate-500 text-xs font-bold transition-all">
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
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 has-[:checked]:bg-(--primary) has-[:checked]:text-white text-slate-500 text-xs font-bold transition-all">
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
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 has-[:checked]:bg-(--primary) has-[:checked]:text-white text-slate-500 text-xs font-bold transition-all">
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
            <input
              name="tag"
              type="text"
              placeholder="Tag (optional)"
              value={formData.tag}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded-lg font-medium"
            >
              Update Signal
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
