import { useState } from 'react';
import { Step } from '@/lib/types';

export default function ShowStep(
  {
    title,
    content: Content,
    answer,
    checkAnswer,
    gotoNextStep,
  }:
    Step &
    {
      checkAnswer: (answer: number) => boolean;
      gotoNextStep: () => void
    }
) {

  const [userAnswer, setUserAnswer] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<boolean | undefined>(undefined);

  const check = () => {
    if (userAnswer === undefined) return;
    
    // TODO: Should check answer here and setResult for parent component

    setResult(
      checkAnswer(userAnswer)
    );
  }

  const hasQuiz = answer !== undefined;

  const quizAnswered = result !== undefined;
  
  return (
    <>
      <Content setAnswer={setUserAnswer} />
      {result === false &&
        <p className='text-red-500'>😵‍💫 Wrong answer</p>
      }
      {result === true &&
        <p className='text-green-500'>🎉 Correct answer</p>
      }
      {hasQuiz && !quizAnswered &&
        <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={check}>Check</button>
      }
      {!hasQuiz || quizAnswered &&
        <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={gotoNextStep}>Continue</button>
      }
    </>
  )
}
