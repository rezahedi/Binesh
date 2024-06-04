'use client';

import { useState, useEffect, Suspense, lazy } from 'react'
import steps from '@contents/computer-science/beginners-python-programming/welcome-to-python';
import ShowStep from './components/ShowStep';

// Utility function to dynamically import a component
const dynamicImport = (path: string) => {
  return lazy(() => import(`${path}`));
};

export default function Page(
  { params }:
  { params: { courseSlug: string, lessonSlug: string, stepNumber: string } }
) {

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [parts, setParts] = useState<typeof steps[0][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const LazyComponent = lazy(() => import('@contents/Part1'));
  // const LazyComponent = lazy(() => import('@contents/computer-science/beginners-python-programming/welcome-to-python'));

  useEffect(() => {
    (async () => {
      setLoading(true);
  
      // TODO: Fetch all the parts

      // Timeout to simulate loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Set the first part
      setParts([
        steps[0],
      ]);
  
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (currentStep > 0 && currentStep < steps.length) {
      setParts([
        ...parts,
        steps[currentStep],
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
    if (answer !== steps[currentStep].answer) {
      return false;
    }
    return true;
  }

  return (
    <div>
      <h1>Course: {params.courseSlug} / Lesson: {params.lessonSlug} / Step: {params.stepNumber}</h1>

      <div className='font-bold text-2xl'>{params.stepNumber}</div>

      {loading &&
        <div className='text-orange-500 font-semibold text-xl'>Loading...</div>
      }

      {parts.length > 0 &&
        <>
          <div>
            {parts.map((step, index) => (
              <ShowStep key={index} {...step} checkAnswer={checkAnswer} />
            ))}
          </div>
          {parseInt(params.stepNumber) < steps.length &&
            <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={()=>setCurrentStep(currentStep+1)}>Continue</button>
          }
        </>
      }

    </div>
  )
}
