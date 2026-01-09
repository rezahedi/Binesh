import { useProgress } from "@/contexts/ProgressContext";
import { cn } from "@/utils/cn";
import CellsStatus from "./CellsStatus";
import ResponsivePopover from "@/components/ui/ResponsivePopover";
import Cell from "./Cell";

const MAIN_BUTTON_CLASSES =
  "flex items-center gap-0.5 p-2 px-3 rounded-full hover:bg-muted cursor-pointer font-semibold text-lg";

const CellsButton = ({ className }: { className?: string }) => {
  const { cells, isLoading } = useProgress();

  if (isLoading && cells === null)
    return (
      <div className={cn(MAIN_BUTTON_CLASSES, className)}>
        {" "}
        <Cell charging />
      </div>
    );

  if (cells === null) return null;

  return (
    <ResponsivePopover
      title="Cell Charge"
      button={
        <button className={cn(MAIN_BUTTON_CLASSES, className)}>
          {cells}
          <Cell charged />
        </button>
      }
    >
      <b className="font-semibold text-lg">Cell Charge</b>
      <CellsStatus />
    </ResponsivePopover>
  );
};

export default CellsButton;
