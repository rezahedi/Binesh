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
  // TODO: Also inactive if quiz result come as true
  const isActive = index + 1 === currentStep;

  const isNextReady =
    (isActive && !step.quiz) || (isActive && step.quiz && quizResult);

  return (
    <div className="min-h-fit pt-8 pb-12">
      <Markdown components={{img: Img}}>{step.content}</Markdown>
      <Markdown components={{img: Img}}></Markdown>
      {step.quiz && (
        <QuizRenderer
          quiz={step.quiz}
          isActive={isActive}
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
