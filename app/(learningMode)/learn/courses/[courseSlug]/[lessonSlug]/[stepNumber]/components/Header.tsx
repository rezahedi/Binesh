import Link from "next/link";
import { X, Zap } from "lucide-react";
import MegaProgressBar from "./MegaProgressBar";

type ProgressBarStep = {
  title: string;
  steps: number;
  currentStep?: number;
}

export default function Header({
  userProgressSteps,
}: {
  userProgressSteps: ProgressBarStep[],
}) {

  const sumOfAllSteps = userProgressSteps.reduce((acc, part) => acc + part.steps, 0);

  if (userProgressSteps.length === 0) {
    const steps: ProgressBarStep[] = [];
    userProgressSteps.forEach((part, index) => {
      steps.push({
        ...part,
        currentStep: part.currentStep ? part.currentStep : 0,
      });
    })
  }

  return (
    <header className="flex items-center sticky top-0 bg-white shadow-lg p-6">
      <div>
        <Link href="../">
          <X />
        </Link>
      </div>
      <div className="grow">
        <MegaProgressBar className="max-w-2xl mx-auto" steps={userProgressSteps} />
      </div>
      <div>
        <Zap className="text-[#ea580c]" />
      </div>
    </header>
  )
}
