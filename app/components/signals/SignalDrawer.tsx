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

export function SignalDrawer({
  signal,
  open,
  onClose,
}: {
  signal: Signal;
  open: boolean;
  onClose: () => void;
}) {
  const priorityColorMap = {
    low: "text-gray-300",
    medium: "text-blue-500",
    high: "text-orange-500",
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="bg-(--background-semi-dark)">
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
        <div className="no-scrollbar h-full m-2 overflow-y-auto px-4 border-2 border-slate-700 rounded-lg p-4 mt-4">
          <p>{signal?.content || "No additional content available."}</p>
        </div>
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
