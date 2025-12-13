import CellsStatus from "@/(learningMode)/learn/courses/[courseSlug]/[lessonSlug]/components/CellsStatus";
import { useProgress } from "@/contexts/ProgressContext";
import { cn } from "@/utils/cn";

const NeedCellsPop = () => {
  const { cells } = useProgress();

  if (cells === null) return null;

  return (
    <div
      className={cn(
        "sticky bottom-10 p-6 mt-20 rounded-xl overflow-hidden bg-background text-balance text-center shadow-2xl",
        "w-full md:w-md mx-auto border-[3px] border-b-[6px] border-accent/50 rounded-3xl"
      )}
    >
      <div className="flex flex-col gap-2 items-center">
        <CellsStatus />
      </div>
    </div>
  );
};

export default NeedCellsPop;
