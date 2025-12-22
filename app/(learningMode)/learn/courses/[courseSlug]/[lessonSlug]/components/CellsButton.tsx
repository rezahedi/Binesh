import { BatteryIcon } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { cn } from "@/utils/cn";
import CellsStatus from "./CellsStatus";
import ResponsivePopover from "@/components/ui/ResponsivePopover";

const MAIN_BUTTON_CLASSES =
  "flex items-center gap-0.5 p-2 px-3 rounded-full hover:bg-muted cursor-pointer font-semibold text-lg";

const CellsButton = ({ className }: { className?: string }) => {
  const { cells, isLoading } = useProgress();

  if (isLoading)
    return (
      <div className={cn(MAIN_BUTTON_CLASSES, className)}>
        {" "}
        <BatteryIcon className="animate-pulse size-5 fill-muted/90 stroke-muted/90 -rotate-90" />
      </div>
    );

  if (cells === null) return null;

  return (
    <ResponsivePopover
      title="Cells Charge"
      button={
        <button className={cn(MAIN_BUTTON_CLASSES, className)}>
          {cells}
          <BatteryIcon className="size-5 fill-secondary/90 stroke-secondary/90 -rotate-90" />
        </button>
      }
    >
      <b className="font-semibold text-lg">Cells Charge</b>
      <CellsStatus />
    </ResponsivePopover>
  );
};

export default CellsButton;
