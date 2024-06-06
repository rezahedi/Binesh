import { useState } from 'react';

type Step = {
  title: string,
  content: ( { setAnswer }: { setAnswer: (answer: number | undefined) => void } ) => React.ReactNode,
  answer: number | undefined,
}

export default function ShowStep(
  {
    title,
    content: Content,
    answer,
    checkAnswer
  }:
    Step &
    { checkAnswer: (answer: number) => boolean }
) {

  const [userAnswer, setUserAnswer] = useState<number | undefined>(undefined);

  const check = () => {
    if (userAnswer === undefined) return;
    
    // TODO: Should check answer here and setResult for parent component
    
    checkAnswer(userAnswer);
  }
  
  return (
    <>
      <Content setAnswer={setUserAnswer} />
      {answer !== undefined &&
        <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={check}>Check</button>
      }
    </>
  )
}
