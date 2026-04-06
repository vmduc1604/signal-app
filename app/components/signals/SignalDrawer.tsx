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
  const priorityColorMap = {
    low: "text-gray-300",
    medium: "text-blue-500",
    high: "text-orange-500",
  };

  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={(o) => !o && onClose()}
      dismissible={true}
    >
      <DrawerContent className="bg-(--background-semi-dark) border-slate-700/50 backdrop-blur-lg">
        <DrawerHeader>
          {signal?.priority && (
            <div className="flex items-start gap-2 mb-3 relative">
              <span
                className={`px-2 py-1 rounded-md bg-slate-800 ${priorityColorMap[signal.priority as keyof typeof priorityColorMap]} text-xs font-semibold uppercase tracking-wider`}
              >
                {signal.priority.toUpperCase()} PRIORITY
              </span>
              {signal.tag && (
                <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-xs font-medium">
                  {signal.tag.toUpperCase()}
                </span>
              )}
            </div>
          )}
          <DrawerTitle className="text-3xl">{signal?.title}</DrawerTitle>

          <DrawerDescription className="text-gray-400">
            {signal?.description}
          </DrawerDescription>
        </DrawerHeader>
        <SignalEditor
          content={signal?.content || ""}
          onChange={(newContent) => {
            updateSignal(signal.id, { content: newContent });
          }}
        />
        <DrawerFooter>
          <button>Submit</button>
          <DrawerClose asChild>
            <button onClick={onClose}>Close</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
