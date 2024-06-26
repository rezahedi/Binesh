import { useState } from 'react';
import { Step } from '@/lib/types';
import { cn } from '@/utils/cn';

export default function ShowStep(
  {
    title,
    content: Content,
    answer,
    checkAnswer,
    continueAction,
    isLastStep=false,
  }:
    Step &
    {
      checkAnswer: (answer: number) => boolean;
      continueAction: () => void;
      isLastStep?: boolean;
    }
) {

  const [userAnswer, setUserAnswer] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<boolean | undefined>(undefined);
  const [stepFinished, setStepFinished] = useState<boolean>(false);

  const check = () => {
    if (userAnswer === undefined) return;
    
    // TODO: Should check answer here and setResult for parent component

    setResult(
      checkAnswer(userAnswer)
    );
  }

  const hasQuiz = answer !== undefined;

  const quizAnswered = result !== undefined;

  const finishStep = () => {
    setStepFinished(true);
    continueAction();
  }
  
  return (
    <div className='min-h-fit pt-8 pb-12'>
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
      {(!hasQuiz || quizAnswered) && !stepFinished &&
        <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={finishStep}>
          {isLastStep ? 'Finish' : 'Continue'}
        </button>
      }
    </div>
  )
}
