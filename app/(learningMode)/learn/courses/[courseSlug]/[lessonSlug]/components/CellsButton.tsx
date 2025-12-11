import { GemIcon, BatteryIcon } from "lucide-react";
import { useProgress } from "../ProgressContext";
import { useUser } from "@stackframe/stack";
import {
  CELLS_MAXIMUM,
  NEXT_CELL_RECHARGE_HOURS,
  POINTS_TO_UNLOCK_CELL,
} from "@/constants/trophy";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { useState } from "react";

const MAIN_BUTTON_CLASSES =
  "flex items-center gap-0.5 p-2 px-3 rounded-full hover:bg-muted cursor-pointer font-semibold text-lg";

const CellsButton = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cells, increase } = useProgress();
  const user = useUser();

  // TODO: Need to have user's points, to trigger cell increase based on user's points minimum

  const handleRefill = async () => {
    if (!user || cells === CELLS_MAXIMUM) return;

    increase();
  };

  if (cells === null)
    return (
      <div className={cn(MAIN_BUTTON_CLASSES, className)}>
        {" "}
        <BatteryIcon className="animate-pulse size-5 fill-muted/90 stroke-muted/90 -rotate-90" />
      </div>
    );

  const message =
    cells === CELLS_MAXIMUM
      ? "Fully charged, keep on learning"
      : cells === 0
        ? "Out of Cells, recharge or wait"
        : "Still have Cells left! keep on learning";

  return (
    <Popover open={cells === 0 || isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className={cn(MAIN_BUTTON_CLASSES, className)}>
          {cells}
          <BatteryIcon className="size-5 fill-destructive/90 stroke-destructive/90 -rotate-90" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 text-center flex flex-col gap-3 bg-background shadow-xl py-6 px-8">
        <b className="font-semibold text-lg">Cells Charge</b>
        <div className="flex justify-around">
          {Array.from({ length: cells }).map((_, i) => (
            <BatteryIcon
              key={i}
              className="size-5 fill-destructive/90 stroke-destructive/90 -rotate-90"
            />
          ))}
          {Array.from({ length: CELLS_MAXIMUM - cells }).map((_, i) => (
            <BatteryIcon
              key={i}
              className={cn(
                "size-5 fill-muted/90 stroke-muted/90 -rotate-90",
                i === 0 && "animate-caret-blink"
              )}
            />
          ))}
        </div>
        {cells < CELLS_MAXIMUM && (
          <i className="text-sm text-muted-foreground">
            Next recharge on every{" "}
            <span className="text-destructive">
              {NEXT_CELL_RECHARGE_HOURS} hours
            </span>
          </i>
        )}
        <p className="text-balance">{message}</p>
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-full flex justify-between"
          disabled={cells === CELLS_MAXIMUM}
          onClick={handleRefill}
        >
          <span>Recharge Cell</span>
          <b className="flex gap-1 items-center">
            <GemIcon className="size-4 fill-primary/90" stroke="0" />
            {POINTS_TO_UNLOCK_CELL}
          </b>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default CellsButton;
