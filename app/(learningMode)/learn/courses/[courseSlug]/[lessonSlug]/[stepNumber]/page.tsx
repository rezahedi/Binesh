'use client';

import { useState, useEffect } from 'react'
import ShowStep from './components/ShowStep';
import Header from "./components/Header";
import { Part, Step } from '@/lib/types';
import { redirect, useRouter } from 'next/navigation';

type ProgressBarPart = {
  title: string;
  steps: Step[];
  currentStep?: number;
}

export default function Page(
  { params }:
  { params: { courseSlug: string, lessonSlug: string, stepNumber: string } }
) {

  const [currentPart, setCurrentPart] = useState<number>( parseInt(params.stepNumber) - 1 );
  
  const userProgressfakeData = [
    {
      currentStep: currentPart==1 ? 3 : 0,
    },
    {
      currentStep: 0,
    },
  ]

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(
    userProgressfakeData[currentPart].currentStep
  );
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allSteps, setAllSteps] = useState<Step[]>([]);
  const [parts, setParts] = useState<ProgressBarPart[]>([]);
  const [error, setError] = useState<boolean>(false);

  if ( isNaN(currentPart) || currentPart < 0 ) {
    redirect('../');
  }


  useEffect(() => {
    (async () => {
      setLoading(true);
  
      // TODO: Fetch all the parts
      const { default: parts } = await import('@contents/computer-science/beginners-python-programming/welcome-to-python');

      // Check if the current part exists
      if ( parts.length <= currentPart ) {
        Promise.resolve();
        setLoading(false);
        setError(true);
        return;
      }

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

    // Set completed steps by user progress data
    setCompletedSteps(
      allSteps.slice(0, currentStep+1)
    );

  }, [loading]);

  useEffect(() => {
    if (error) redirect('../');
  }, [error]);

  useEffect(() => {
    if (currentStep >= 0 && currentStep < allSteps.length) {
      
      // TODO: Update the user progress in the parts
      const newParts = [...parts];
      newParts[currentPart].currentStep = currentStep;
      setParts(newParts);

      setCompletedSteps([
        ...(currentStep ===0 ? [] : completedSteps), 
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
  const isLastStep = currentStep === allSteps.length-1 || !parts[currentPart+1]

  const gotoNextStep = () => {
    if (isThereNextStep) {
      setCurrentStep(currentStep+1);

      console.log('Finished', currentStep * 100 / allSteps.length);
    } else {

      // TODO: Update the user progress in the parts and set current part finished
      const newParts = [...parts];
      newParts[currentPart].currentStep = currentStep+1;
      setParts(newParts);

      if(currentPart+1 < parts.length) {
        setAllSteps(parts[currentPart+1].steps);
        setCurrentPart(currentPart+1);
        setCurrentStep(0);
        router.push(`/learn/courses/${params.courseSlug}/${params.lessonSlug}/${(currentPart+2).toString()}`);
        console.log('Finished');
      }
  
      // TODO: Go back to the lesson page

    }
  }

  return (
    <div className="flex flex-col h-screen min-h-fit">
      <Header userProgressSteps={parts} currentPart={currentPart} />
      <main className="max-w-2xl mx-auto px-4 h-full">
        {loading &&
          <div className='text-orange-500 font-semibold text-xl'>Loading...</div>
        }
        {error &&
          <div className='font-semibold text-xl'>{error}</div>
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
