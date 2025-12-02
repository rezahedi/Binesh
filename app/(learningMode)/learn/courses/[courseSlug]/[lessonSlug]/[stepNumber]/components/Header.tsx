import Link from "next/link";
import { XIcon, ZapIcon } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useProgress } from "../ProgressContext";
import { cn } from "@/utils/cn";

export default function Header({ className }: { className?: string }) {
  const { currentStep, stepCount } = useProgress();
  const percentage = stepCount
    ? Math.round((currentStep / stepCount) * 100)
    : 0;

  return (
    <header
      className={cn("flex items-center bg-white shadow-lg z-10 p-5", className)}
    >
      <div>
        <Link href="../">
          <XIcon />
        </Link>
      </div>
      <div className="grow">
        <ProgressBar
          className="max-w-2xl mx-auto px-4"
          title=""
          progress={percentage}
        />
      </div>
      <div>
        <ZapIcon className="fill-[#ea580c]" stroke="0" />
      </div>
    </header>
  );
}
