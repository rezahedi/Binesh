"use client";

import {useState, useEffect} from "react";
import ShowStep from "./components/ShowStep";
import Header from "./components/Header";
import {Part, Step} from "@/lib/types";
import {redirect, useRouter} from "next/navigation";
import useProgress from "./useProgress";
import {SectionType} from "@/lib/quizParser";

type ProgressBarPart = {
  title: string;
  steps: Step[];
  currentStep?: number;
};

export default function Page({
  params,
}: {
  params: {courseSlug: string; lessonSlug: string; stepNumber: string};
}) {
  const {setProgress} = useProgress();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [steps, setSteps] = useState<SectionType[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(
    parseInt(params.stepNumber) || 1
  );

  useEffect(() => {
    (async () => {
      setLoading(true);

      // TODO: Fetch all the parts
      const response = await fetch(
        "/api/content/computer-science/beginners-python-programming/welcome-to-python.md"
      );
      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setSteps(data.steps);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex flex-col h-screen min-h-fit">
      <Header />
      <main className="max-w-2xl mx-auto px-4 h-full">
        {loading && (
          <div className="text-orange-500 font-semibold text-xl">
            Loading...
          </div>
        )}
        {error && <div className="font-semibold text-xl">{error}</div>}

        {steps.length > 0 && (
          <>
            {steps.slice(0, currentStep).map((step, index) => (
              <ShowStep key={index} step={step} />
            ))}
            <button onClick={() => setCurrentStep((prev) => prev + 1)}>
              Next
            </button>
          </>
        )}
      </main>
    </div>
  );
}
