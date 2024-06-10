import Link from "next/link";
import { X, Zap } from "lucide-react";
import MegaProgressBar from "./components/MegaProgressBar";
import { parts } from "@contents/computer-science/beginners-python-programming/welcome-to-python";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
    <div className="flex flex-col h-screen min-h-fit">
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
      <main className="max-w-2xl mx-auto h-full">
        {children}
      </main>
    </div>
  );
}
