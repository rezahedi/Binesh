import Link from "next/link";
import { X, Zap } from "lucide-react";
import MegaProgressBar from "./MegaProgressBar";
import { Step } from "@/lib/types";

type ProgressBarStep = {
  title: string;
  steps: Step[];
  currentStep?: number;
}

export default function Header({
  userProgressSteps,
  currentPart,
}: {
  userProgressSteps: ProgressBarStep[],
  currentPart: number,
}) {

  const sumOfAllSteps = userProgressSteps.reduce((acc, part) => acc + part.steps.length, 0);

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
        <MegaProgressBar
          className="max-w-2xl mx-auto px-4"
          steps={
            userProgressSteps.map((part, index) => ({
              ...part,
              steps: part.steps.length,
            }))
          }
          currentPart={currentPart}
        />
      </div>
      <div>
        <Zap className="text-[#ea580c]" />
      </div>
    </header>
  )
}
