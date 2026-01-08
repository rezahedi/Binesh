import { cn } from "@/utils/cn";
import { BatteryIcon } from "lucide-react";

const Cell = ({
  charged = false,
  charging = false,
}: {
  charged?: boolean;
  charging?: boolean;
}) => {
  if (charged)
    return (
      <BatteryIcon className="size-5 fill-secondary-dark/90 stroke-secondary-dark/90 -rotate-90" />
    );

  return (
    <BatteryIcon
      className={cn(
        "size-5 fill-muted stroke-muted -rotate-90",
        charging && "animate-pulse"
      )}
    />
  );
};

export default Cell;
