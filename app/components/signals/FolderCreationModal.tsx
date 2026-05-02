import { useState } from "react";

export function FolderCreationModal({
  onClose,
  onCreateFolder,
}: {
  onClose: () => void;
  onCreateFolder: (name: string) => void;
}) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateFolder(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-sm bg-[rgba(16,23,34,0.8)] backdrop-blur-[12px] border border-slate-800 dark:border-primary/20 rounded-2xl shadow-2xl overflow-hidden p-6">
        <h2 className="text-xl font-bold text-slate-100 mb-4">New Folder</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            autoFocus
            placeholder="Folder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 focus:border-(--primary) focus:ring-1 focus:ring-(--primary) rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 transition-all outline-none"
          />
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 text-sm font-medium bg-(--primary) hover:bg-(--primary-dark) text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
