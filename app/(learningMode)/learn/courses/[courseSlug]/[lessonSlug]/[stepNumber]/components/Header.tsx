import Link from "next/link";
import { XIcon, ZapIcon } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useProgress } from "../ProgressContext";

export default function Header() {
  const { currentStep, stepCount } = useProgress();
  const percentage = stepCount
    ? Math.round((currentStep / stepCount) * 100)
    : 0;

  return (
    <header className="flex items-center sticky top-0 bg-white shadow-lg p-6">
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
