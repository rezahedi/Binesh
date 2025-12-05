import Link from "next/link";
import { XIcon, HeartIcon } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useProgress } from "../ProgressContext";
import { cn } from "@/utils/cn";

export default function Header({ className }: { className?: string }) {
  const { currentStep, totalSteps } = useProgress();
  const percentage = totalSteps
    ? Math.round((currentStep / totalSteps) * 100)
    : 0;

  return (
    <header className={cn("bg-background shadow-lg z-10 p-4", className)}>
      <div className="max-w-2xl mx-auto flex items-center">
        <div>
          <Link href="./" className="block p-2 rounded-full hover:bg-muted">
            <XIcon />
          </Link>
        </div>
        <div className="grow">
          <ProgressBar
            className="max-w-2xl mx-auto px-3"
            progress={percentage}
          />
        </div>
        <div>
          <button className="flex items-center gap-0.5 p-2 px-3 rounded-full hover:bg-muted cursor-pointer font-semibold text-lg">
            3 <HeartIcon className="fill-destructive/90" stroke="0" />
          </button>
        </div>
      </div>
    </header>
  );
}
