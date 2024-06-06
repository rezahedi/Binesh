'use client';

import { useState, useEffect } from 'react'
import ShowStep from './components/ShowStep';

type Step = {
  title: string,
  content: () => React.ReactNode,
  answer: number,
}

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
    if (answer !== allParts[currentStep].answer) {
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
          {parseInt(params.stepNumber) < allParts.length &&
            <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={()=>setCurrentStep(currentStep+1)}>Continue</button>
          }
        </>
      }

    </div>
  )
}
