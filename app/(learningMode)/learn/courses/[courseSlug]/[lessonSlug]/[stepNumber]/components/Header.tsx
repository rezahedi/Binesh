import Link from "next/link";
import { X, Zap } from "lucide-react";
import MegaProgressBar from "./MegaProgressBar";
import { parts } from "@contents/computer-science/beginners-python-programming/welcome-to-python";

export default function Header() {

  const sumOfPartsSteps = parts.reduce((acc, part) => acc + part.steps, 0);
  const steps: Array<{ title: string, percentage: number, progress: number }> = [];

  parts.forEach((part, index) => {
    steps.push({
      title: part.title,
      percentage: Math.round((part.steps / sumOfPartsSteps) * 100),
      progress: 0,
    });
  })

  return (
    <header className="flex items-center sticky top-0 bg-white shadow-lg p-6">
      <div>
        <Link href="../">
          <X />
        </Link>
      </div>
      <div className="grow">
        <MegaProgressBar className="max-w-2xl mx-auto" steps={steps} />
      </div>
      <div>
        <Zap className="text-[#ea580c]" />
      </div>
    </header>
  )
}
