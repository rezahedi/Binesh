import {SectionType} from "@/lib/quizParser";
import QuizRenderer from "./quizzes/QuizRenderer";
import Markdown from "react-markdown";
import Img from "./markdown/Img";
import {useProgress} from "../ProgressContext";
import {useState} from "react";

export default function ShowStep({
  step,
  index,
}: {
  step: SectionType;
  index: number;
}) {
  const {nextStep, currentStep} = useProgress();
  const [quizResult, setQuizResult] = useState<boolean | null>(null);

  // TODO: Temporary solution, find a better way than passing step's `index` to check if this is the curr step
  const haveQuiz = Boolean(step.quiz);
  const isCurrent = index + 1 === currentStep;
  const isQuizFinished = quizResult;

  const isNextReady = isCurrent && (!haveQuiz || (haveQuiz && isQuizFinished));

  return (
    <div className="min-h-fit pt-8 pb-12">
      <Markdown components={{img: Img}}>{step.content}</Markdown>
      <Markdown components={{img: Img}}></Markdown>
      {step.quiz && (
        <QuizRenderer
          quiz={step.quiz}
          isActive={isCurrent && !isQuizFinished}
          onCheck={setQuizResult}
        />
      )}
      {quizResult !== null && (
        <p>{quizResult ? "✅ Correct" : "❌ Incorrect"}</p>
      )}
      {isNextReady && <button onClick={nextStep}>Next</button>}
    </div>
  );
}
