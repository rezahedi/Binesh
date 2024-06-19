'use client';

import { useState, useEffect } from 'react'
import ShowStep from './components/ShowStep';
import Header from "./components/Header";
import { Part, Step } from '@/lib/types';

type ProgressBarPart = {
  title: string;
  steps: Step[];
  currentStep?: number;
}

export default function Page(
  { params }:
  { params: { courseSlug: string, lessonSlug: string, stepNumber: string } }
) {

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allSteps, setAllSteps] = useState<Step[]>([]);
  const [parts, setParts] = useState<ProgressBarPart[]>([]);

  // TODO: Get the current part from the URL and minus 1 to get the current array's index
  const currentPart = 2 - 1;

  const userProgressfakeData = [
    {
      currentStep: 0,
    },
    {
      currentStep: 0,
    },
  ]

  useEffect(() => {
    (async () => {
      setLoading(true);
  
      // TODO: Fetch all the parts
      const { default: parts } = await import('@contents/computer-science/beginners-python-programming/welcome-to-python');

      // Update parts with user progress
      const partsWithUserProgress = parts.map((part, index) => {
        return {
          ...part,
          currentStep: userProgressfakeData[index].currentStep,
        }
      })
      setParts(partsWithUserProgress);

      setAllSteps(parts[ currentPart ].steps);

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (loading) return;

    // Set the first part
    setCompletedSteps([
      allSteps[0],
    ]);
  }, [loading]);

  useEffect(() => {
    if (currentStep > 0 && currentStep < allSteps.length) {
      
      // TODO: Update the user progress in the parts
      const newParts = [...parts];
      newParts[currentPart].currentStep = currentStep;
      setParts(newParts);

      setCompletedSteps([
        ...completedSteps,
        allSteps[currentStep],
      ]);
    }
  }, [currentStep]);

  // TODO: I should scroll to the point that the new part's top is on the top of the screen
  // TODO: Because may some parts are too long and the user should see the new part from the top
  // Scroll to bottom when parts change
  useEffect(() => {
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
  }, [completedSteps]);

  const checkAnswer = (answer: number): boolean => {
    console.log('(answer, user answer) = ', answer, allSteps[currentStep].answer);
    if (answer !== allSteps[currentStep].answer) {
      console.log('Wrong answer');
      return false;
    }
    console.log('Correct answer');
    return true;
  }

  const isThereNextStep = currentStep < allSteps.length-1
  const isLastStep = currentStep === allSteps.length-1

  const gotoNextStep = () => {
    if (isThereNextStep) {
      setCurrentStep(currentStep+1);

      console.log('Finished', currentStep * 100 / allSteps.length);
    } else {
      console.log('Finished');
  
      // TODO: Go back to the lesson page

    }
  }

  return (
    <div className="flex flex-col h-screen min-h-fit">
      <Header userProgressSteps={parts} />
      <main className="max-w-2xl mx-auto h-full">
        {loading &&
          <div className='text-orange-500 font-semibold text-xl'>Loading...</div>
        }

        {completedSteps.length > 0 &&
          <>
            {completedSteps.map((step, index) => (
              <ShowStep key={index} {...step} checkAnswer={checkAnswer} continueAction={gotoNextStep} isLastStep={isLastStep} />
            ))}
          </>
        }
      </main>
    </div>
  )
}
