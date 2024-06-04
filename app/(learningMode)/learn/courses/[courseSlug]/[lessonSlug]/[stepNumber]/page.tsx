'use client';

import { useState, useEffect, Suspense, lazy } from 'react'
import steps from '@contents/computer-science/beginners-python-programming/welcome-to-python';
import ShowStep from './components/ShowStep';

const fakeParts = [
  { title: 'Step 1', component: './contents/Part1.tsx', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quidem corporis nostrum nemo error voluptate repellendus ratione, quasi doloremque illum? Corrupti expedita magni modi porro omnis id, fuga consequatur facere? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fuga quae explicabo voluptas a excepturi, quibusdam dicta ratione dignissimos hic iure amet nulla soluta architecto minus natus. Cum, eaque officia!' },
  { title: 'Step 2', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores temporibus qui beatae repellat quo quis libero quisquam dicta. Rem eum nam et praesentium nemo numquam eos porro blanditiis veritatis qui.' },
  { title: 'Step 3', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa saepe quod veritatis obcaecati atque, tempora iusto? Ipsum tempore nesciunt, quisquam rem iure itaque, velit harum quos commodi exercitationem, atque iusto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio molestiae, ea consectetur quisquam vel architecto ex iure tempora itaque quasi nihil accusamus saepe, repellendus delectus iusto obcaecati dolor harum. Harum.' },
  { title: 'Step 4', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae tempora officia repudiandae perspiciatis dolores natus ab harum aliquid nemo reprehenderit deserunt at maxime inventore ipsa quo, quis iusto culpa delectus.' },
  { title: 'Step 5', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quidem corporis nostrum nemo error voluptate repellendus ratione, quasi doloremque illum? Corrupti expedita magni modi porro omnis id, fuga consequatur facere? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fuga quae explicabo voluptas a excepturi, quibusdam dicta ratione dignissimos hic iure amet nulla soluta architecto minus natus. Cum, eaque officia!' },
  { title: 'Step 6', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores temporibus qui beatae repellat quo quis libero quisquam dicta. Rem eum nam et praesentium nemo numquam eos porro blanditiis veritatis qui.' },
  { title: 'Step 7', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa saepe quod veritatis obcaecati atque, tempora iusto? Ipsum tempore nesciunt, quisquam rem iure itaque, velit harum quos commodi exercitationem, atque iusto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio molestiae, ea consectetur quisquam vel architecto ex iure tempora itaque quasi nihil accusamus saepe, repellendus delectus iusto obcaecati dolor harum. Harum.' },
  { title: 'Step 8', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae tempora officia repudiandae perspiciatis dolores natus ab harum aliquid nemo reprehenderit deserunt at maxime inventore ipsa quo, quis iusto culpa delectus.' },
  { title: 'Step 9', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quidem corporis nostrum nemo error voluptate repellendus ratione, quasi doloremque illum? Corrupti expedita magni modi porro omnis id, fuga consequatur facere? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fuga quae explicabo voluptas a excepturi, quibusdam dicta ratione dignissimos hic iure amet nulla soluta architecto minus natus. Cum, eaque officia!' },
  { title: 'Step 10', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores temporibus qui beatae repellat quo quis libero quisquam dicta. Rem eum nam et praesentium nemo numquam eos porro blanditiis veritatis qui.' },
];

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
    if (currentStep > 0 && currentStep < fakeParts.length) {
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
