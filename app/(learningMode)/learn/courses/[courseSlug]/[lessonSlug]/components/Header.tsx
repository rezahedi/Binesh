import ProgressBar from "./ProgressBar";
import { useProgress } from "@/contexts/ProgressContext";
import { cn } from "@/utils/cn";
import CancelLessonButton from "./CancelLessonButton";
import CellsButton from "./CellsButton";

export default function Header({ className }: { className?: string }) {
  const { currentStep, totalSteps, finished } = useProgress();
  const percentage = !finished
    ? totalSteps
      ? Math.round(((currentStep - 1) / totalSteps) * 100)
      : 0
    : 100;
  console.log(percentage, currentStep, totalSteps);

  return (
    <header className={cn("bg-background shadow-lg z-10 p-4", className)}>
      <div className="max-w-2xl mx-auto flex items-center">
        <CancelLessonButton redirectUrl="./" />
        <div className="grow">
          <ProgressBar
            className="max-w-2xl mx-auto px-3"
            progress={percentage}
          />
        </div>
        <div>
          <CellsButton />
        </div>
      </div>
    </header>
  );
}
