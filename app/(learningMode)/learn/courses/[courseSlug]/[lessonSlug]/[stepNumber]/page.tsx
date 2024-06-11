'use client';

import { useState, useEffect } from 'react'
import ShowStep from './components/ShowStep';
import Header from "./components/Header";
import { Step } from '@/lib/types';

export default function Page(
  { params }:
  { params: { courseSlug: string, lessonSlug: string, stepNumber: string } }
) {

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [parts, setParts] = useState<Step[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allParts, setAllParts] = useState<Step[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
  
      // TODO: Fetch all the parts
      const { default: steps } = await import('@contents/computer-science/beginners-python-programming/welcome-to-python');
      setAllParts(steps);

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (loading) return;

    // Set the first part
    setParts([
      allParts[0],
    ]);
  }, [loading]);

  useEffect(() => {
    if (currentStep > 0 && currentStep < allParts.length) {
      setParts([
        ...parts,
        allParts[currentStep],
      ]);
    }
  }, [currentStep]);

  // TODO: I should scroll to the point that the new part's top is on the top of the screen
  // TODO: Because may some parts are too long and the user should see the new part from the top
  // Scroll to bottom when parts change
  useEffect(() => {
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
  }, [parts]);

  const checkAnswer = (answer: number): boolean => {
    console.log('(answer, user answer) = ', answer, allParts[currentStep].answer);
    if (answer !== allParts[currentStep].answer) {
      console.log('Wrong answer');
      return false;
    }
    console.log('Correct answer');
    return true;
  }

  const isThereNextStep = currentStep < allParts.length-1
  const isLastStep = currentStep === allParts.length-1

  const gotoNextStep = () => {
    if (isThereNextStep)
      setCurrentStep(currentStep+1);
    else{
      console.log('Finished');
  
      // TODO: Go back to the lesson page

    }
  }

  return (
    <div className="flex flex-col h-screen min-h-fit">
      <Header />
      <main className="max-w-2xl mx-auto h-full">
        {loading &&
          <div className='text-orange-500 font-semibold text-xl'>Loading...</div>
        }

        {parts.length > 0 &&
          <>
            {parts.map((step, index) => (
              <ShowStep key={index} {...step} checkAnswer={checkAnswer} continueAction={gotoNextStep} isLastStep={isLastStep} />
            ))}
          </>
        }
      </main>
    </div>
  )
}
