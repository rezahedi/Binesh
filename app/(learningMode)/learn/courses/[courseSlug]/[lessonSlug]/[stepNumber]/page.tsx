'use client';

import { useState, useEffect } from 'react'

const fakeParts = [
  { title: 'Step 1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quidem corporis nostrum nemo error voluptate repellendus ratione, quasi doloremque illum? Corrupti expedita magni modi porro omnis id, fuga consequatur facere? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fuga quae explicabo voluptas a excepturi, quibusdam dicta ratione dignissimos hic iure amet nulla soluta architecto minus natus. Cum, eaque officia!' },
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

export default function Page(
  { params }:
  { params: { courseSlug: string, lessonSlug: string, stepNumber: string } }
) {
  console.log(params)

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [parts, setParts] = useState<string[]>([]);

  useEffect(() => {
    setParts([
      fakeParts[0].content,
    ]);
  }, []);

  useEffect(() => {
    if (currentStep > 0) {
      setParts([
        ...parts,
        fakeParts[currentStep].content,
      ]);
    }
  }, [currentStep]);


  return (
    <div>
      <h1>Course: {params.courseSlug} / Lesson: {params.lessonSlug} / Step: {params.stepNumber}</h1>

      <div className='font-bold text-2xl'>{params.stepNumber}</div>

      <div>
        {parts.map((part, index) => (
          <p className='py-4' key={index}>{part}</p>
        ))}
      </div>

      {parseInt(params.stepNumber) < fakeParts.length &&
        <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={()=>setCurrentStep(currentStep+1)}>Continue</button>
      }
    </div>
  )
}
