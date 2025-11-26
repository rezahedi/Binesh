import Link from "next/link";
import {X, Zap} from "lucide-react";
import ProgressBar from "./ProgressBar";
import {useProgress} from "../ProgressContext";

export default function Header() {
  const {currentStep, stepCount} = useProgress();
  const percentage = stepCount
    ? Math.round((currentStep / stepCount) * 100)
    : 0;

  return (
    <header className="flex items-center sticky top-0 bg-white shadow-lg p-6">
      <div>
        <Link href="../">
          <X />
        </Link>
      </div>
      <div className="grow">
        <ProgressBar
          className="max-w-2xl mx-auto px-4"
          title=""
          progress={percentage}
          focused={true}
        />
      </div>
      <div>
        <Zap className="text-[#ea580c]" />
      </div>
    </header>
  );
}
