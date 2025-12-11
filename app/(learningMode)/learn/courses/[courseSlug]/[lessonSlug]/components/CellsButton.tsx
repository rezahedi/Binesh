import { HeartIcon } from "lucide-react";
import { useProgress } from "../ProgressContext";
import { useUser } from "@stackframe/stack";
import { CELLS_MAXIMUM } from "@/constants/trophy";

const CellsButton = ({ className }: { className?: string }) => {
  const { cells, increase, isLoading } = useProgress();
  const user = useUser();

  const handleRefill = async () => {
    if (!user || cells === CELLS_MAXIMUM) return;

    increase();
  };

  return (
    <button className={className} onClick={handleRefill}>
      {isLoading && <>...</>}
      {!isLoading && cells !== null ? cells : "?"}
      <HeartIcon className="fill-destructive/90" stroke="0" />
    </button>
  );
};

export default CellsButton;
