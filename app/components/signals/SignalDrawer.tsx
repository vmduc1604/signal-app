import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Signal } from "@/app/types/signal";
import { SignalEditor } from "./SignalEditor";

export function SignalDrawer({
  signal,
  open,
  onClose,
  updateSignal,
}: {
  signal: Signal | null;
  open: boolean;
  onClose: () => void;
  updateSignal: (id: number, data: Partial<Signal>) => void;
}) {
  const [localContent, setLocalContent] = useState("");

  // Sync incoming signal content to local state when opened
  useEffect(() => {
    if (open) {
      setLocalContent(signal?.content || "");
    }
  }, [signal?.id, open, signal?.content]);

  const handleSaveAndClose = () => {
    if (signal && localContent !== signal.content) {
      updateSignal(signal.id, { content: localContent });
    }
    onClose();
  };

  const priorityColorMap = {
    low: "text-slate-400 bg-slate-800",
    medium: "text-blue-400 bg-blue-900/30",
    high: "text-orange-400 bg-orange-900/30",
  };

  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={(o) => {
        if (!o) handleSaveAndClose();
      }}
      dismissible={true}
    >
      <DrawerContent className="bg-(--background-semi-dark) border-slate-800 backdrop-blur-xl outline-none">
        <DrawerHeader className="pb-4">
          {signal?.priority && (
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-2.5 py-1 rounded-md ${priorityColorMap[signal.priority as keyof typeof priorityColorMap]} text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
                {signal.priority}
              </span>
              {signal.tag && (
                <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  {signal.tag}
                </span>
              )}
            </div>
          )}
          <DrawerTitle className="text-3xl font-bold tracking-tight text-slate-100">
            {signal?.title}
          </DrawerTitle>
          <DrawerDescription className="text-slate-400 text-sm mt-1">
            {signal?.description}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex-1 overflow-hidden px-4">
          <SignalEditor
            content={localContent}
            onChange={(newContent) => {
              setLocalContent(newContent);
            }}
          />
        </div>
        
        <DrawerFooter className="pt-2 border-t border-slate-800/50 flex-row justify-end gap-3">
          <DrawerClose asChild>
            <button className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
              Cancel
            </button>
          </DrawerClose>
          <button 
            onClick={handleSaveAndClose}
            className="px-5 py-2 text-sm font-medium bg-(--primary) hover:bg-(--primary-dark) text-white rounded-lg transition-colors cursor-pointer shadow-lg shadow-primary/20"
          >
            Save & Close
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
