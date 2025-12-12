import { BatteryIcon } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/cn";
import { useState } from "react";
import CellsStatus from "./CellsStatus";

const MAIN_BUTTON_CLASSES =
  "flex items-center gap-0.5 p-2 px-3 rounded-full hover:bg-muted cursor-pointer font-semibold text-lg";

const CellsButton = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    <Popover open={cells === 0 || isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className={cn(MAIN_BUTTON_CLASSES, className)}>
          {cells}
          <BatteryIcon className="size-5 fill-secondary/90 stroke-secondary/90 -rotate-90" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 text-center flex flex-col gap-3 bg-background shadow-xl py-6 px-8">
        <b className="font-semibold text-lg">Cells Charge</b>
        <CellsStatus />
      </PopoverContent>
    </Popover>
  );
};

export default CellsButton;
