import { Button } from "@/components/ui/button";
import {
  CELLS_MAXIMUM,
  NEXT_CELL_RECHARGE_HOURS,
  POINTS_TO_UNLOCK_CELL,
} from "@/constants/trophy";
import { useProgress } from "@/contexts/ProgressContext";
import { cn } from "@/utils/cn";
import { BatteryIcon, GemIcon } from "lucide-react";

const CellsStatus = () => {
  const { cells, points, increaseCell } = useProgress();

  if (cells === null || points === null) return null;

  const haveEnoughPoints = points.total >= POINTS_TO_UNLOCK_CELL;

  const message =
    cells === CELLS_MAXIMUM
      ? "Fully charged, keep on learning"
      : cells === 0
        ? haveEnoughPoints
          ? "Out of Cells, recharge or wait"
          : "Out of Cells and Points, You have to wait until next recharge!"
        : "Still have Cells left! keep on learning";

  const handleRefill = async () => {
    if (cells === CELLS_MAXIMUM || !haveEnoughPoints) return;

    increaseCell();
  };

  return (
    <>
      <div className="flex gap-3 justify-around">
        {Array.from({ length: cells }).map((_, i) => (
          <BatteryIcon
            key={i}
            className="size-5 fill-secondary/90 stroke-secondary/90 -rotate-90"
          />
        ))}
        {Array.from({ length: CELLS_MAXIMUM - cells }).map((_, i) => (
          <BatteryIcon
            key={i + cells}
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
      {haveEnoughPoints && (
        <Button
          variant={"secondary"}
          size={"sm"}
          className="w-full flex justify-between"
          disabled={cells === CELLS_MAXIMUM}
          onClick={handleRefill}
        >
          <span>Recharge Cell</span>
          <b className="flex gap-1 items-center">
            <GemIcon className="size-4 fill-primary/90" stroke="none" />
            {POINTS_TO_UNLOCK_CELL}
          </b>
        </Button>
      )}
    </>
  );
};

export default CellsStatus;
