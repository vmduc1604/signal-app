"use client";
import { useState, useEffect } from "react";
import SignalList from "../components/signals/SignalList";
import SignalCreationModal from "../components/signals/SignalCreationModal";
import { FolderCreationModal } from "../components/signals/FolderCreationModal";
import { SignalDrawer } from "../components/signals/SignalDrawer";
import { useSignal } from "../context/SignalContext";
import { Signal } from "../types/signal";
import { FolderIcon, Plus, Folder as FolderOutline, Trash2 } from "lucide-react";
import { usePomodoro } from "../context/PomodoroContext";
import { formatTime } from "../utils/formatTime";

export default function SignalsPage() {
  const { signals, folders, createSignal, deleteSignal, toggleSignal, updateSignal, createFolder, deleteFolder } =
    useSignal();
  const { time } = usePomodoro();
  
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  
  const [selectedFolderId, setSelectedFolderId] = useState<number>(0);

  // If the selected folder is deleted, fallback to Inbox (0)
  useEffect(() => {
    if (!folders.find(f => f.id === selectedFolderId)) {
      setSelectedFolderId(0);
    }
  }, [folders, selectedFolderId]);

  const activeFolder = folders.find(f => f.id === selectedFolderId);
  const folderSignals = signals.filter((s) => s.folderId === selectedFolderId);
  
  // We can choose to hide completed signals or just let them stay struck-through.
  // The prompt asked to remove Archived section, meaning they should probably just stay in the folder but marked complete.
  // We'll just show them all in the folder for now.
  
  const handleClick = (signal: Signal) => {
    setSelectedSignal(signal);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Folders */}
        <aside className="w-64 border-r border-slate-800/60 bg-[rgba(11,15,26,0.6)] backdrop-blur-md flex flex-col pt-8 pb-4">
          <div className="px-6 mb-6">
            <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Directories</h2>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 space-y-1">
            {folders.map(folder => (
              <div 
                key={folder.id} 
                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                  selectedFolderId === folder.id 
                    ? "bg-(--primary)/10 text-(--primary)" 
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
                }`}
                onClick={() => setSelectedFolderId(folder.id)}
              >
                <div className="flex items-center gap-3">
                  {selectedFolderId === folder.id ? <FolderIcon className="w-4 h-4 fill-current" /> : <FolderOutline className="w-4 h-4" />}
                  <span className="font-medium text-sm">{folder.name}</span>
                </div>
                {folder.id !== 0 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFolder(folder.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </nav>
          <div className="px-4 mt-auto pt-4 border-t border-slate-800/50">
            <button 
              onClick={() => setIsFolderModalOpen(true)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Folder
            </button>
          </div>
        </aside>

        {/* Main Content - Signals List */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 relative">
          <div className="max-w-4xl mx-auto flex flex-col h-full">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-slate-900 dark:text-white text-4xl font-bold leading-tight mb-2 flex items-center gap-3">
                  {activeFolder?.name || "Inbox"}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-body text-base">
                  {folderSignals.length} signal{folderSignals.length !== 1 ? 's' : ''} in this directory.
                </p>
              </div>
              <button
                className="bg-(--primary) hover:bg-(--primary-dark) cursor-pointer text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                onClick={() => setIsCreationModalOpen(true)}
              >
                <Plus className="w-5 h-5" />
                New Signal
              </button>
            </div>
            
            <div className="flex-1 mt-2">
              <SignalList
                signals={folderSignals}
                onToggle={toggleSignal}
                onDelete={deleteSignal}
                onEdit={() => {}}
                onClickSignal={handleClick}
              />
            </div>
          </div>
        </main>

        <div className="time font-bold text-3xl fixed bottom-4 right-4 text-gray-700 pointer-events-none">
          {formatTime(time)}
        </div>
      </div>

      {isCreationModalOpen && (
        <SignalCreationModal
          folderId={selectedFolderId}
          onClose={() => setIsCreationModalOpen(false)}
          onCreateSignal={(data) => {
            createSignal(data);
            setIsCreationModalOpen(false);
          }}
        />
      )}
      
      {isFolderModalOpen && (
        <FolderCreationModal
          onClose={() => setIsFolderModalOpen(false)}
          onCreateFolder={createFolder}
        />
      )}

      <SignalDrawer
        signal={selectedSignal}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        updateSignal={updateSignal}
      />
    </>
  );
}
