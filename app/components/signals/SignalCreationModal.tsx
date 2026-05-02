"use client";
import { useState } from "react";
import { SignalForm } from "@/app/types/signal";
import {
  PenLine,
  FileText,
  ListOrdered,
  Rocket,
  ChartColumnStacked,
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
    onCreateSignal(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
      <div className="relative w-full max-w-xl bg-[rgba(16,23,34,0.8)] backdrop-blur-[12px] border border-[rgba(60,131,246,0.2)] rounded-4xl shadow-2xl overflow-hidden border border-slate-800 dark:border-primary/20 p-6 w-full max-w-md relative shadow-xl">
        <div className=" pb-2">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-100">
              Create New Signal
            </h2>
          </div>
          <p className="text-slate-400 text-sm">
            Initialize mission parameters for deployment across the neural
            network.
          </p>
        </div>
        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              {<PenLine className="w-4 h-4 text-(--primary)" />}
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                Signal Name
              </label>
            </div>
            <input
              name="title"
              type="text"
              placeholder="Signal Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-700 focus:border-(--primary) focus:ring-1 focus:ring-(--primary) rounded-full px-4 py-3 text-slate-100 placeholder:text-slate-600 transition-all outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
              {<FileText className="w-4 h-4 text-(--primary)" />}
              Signal Description
            </label>
            <textarea
              name="description"
              placeholder="Signal Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-900/50 border border-slate-700 focus:border-(--primary) focus:ring-1 focus:ring-(--primary) rounded-2xl px-4 py-3 text-slate-100 placeholder:text-slate-600 min-h-[120px] transition-all outline-none resize-none"
            />
          </div>
          {/* Tags and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                {<ChartColumnStacked className="w-4 h-4 text-(--primary)" />}
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  name="tag"
                  type="text"
                  placeholder="Enter or select a category"
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 focus:border-(--primary) focus:ring-1 focus:ring-(--primary) rounded-full px-4 py-2 text-slate-100 placeholder:text-slate-600  transition-all outline-none"
                />
                {/* {recentTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recentTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, tag }))
                        }
                        className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs hover:bg-slate-600 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )} */}
              </div>
            </div>
            {/* Priority */}
            <div className="flex flex-col space-between gap-2">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                {<ListOrdered className="w-4 h-4 text-(--primary)" />}
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
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              className="w-full sm:flex-1 bg-(--primary) hover:bg-(--primary)/90 text-white font-bold py-4 rounded-4xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 group cursor-pointer"
              type="submit"
            >
              <span>LAUNCH SIGNAL</span>
              <Rocket className="w-5 h-5 text-white group-hover:animate-[pulse_1s_infinite]" />
            </button>
            <button
              className="w-full sm:w-auto px-8 py-4 text-slate-400 hover:text-slate-100 font-medium transition-colors cursor-pointer"
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
