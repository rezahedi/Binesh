import {SectionType} from "@/lib/quizParser";
import QuizRenderer from "./quizzes/QuizRenderer";
import Markdown from "react-markdown";
import Img from "./markdown/Img";
import {useProgress} from "../ProgressContext";

export default function ShowStep({
  step,
  index,
}: {
  step: SectionType;
  index: number;
}) {
  const {nextStep, currentStep} = useProgress();

  // TODO: Temporary solution, find a better way than passing step's `index` to check if this is the curr step
  const isActive = index + 1 === currentStep;

  return (
    <div className="min-h-fit pt-8 pb-12">
      <Markdown components={{img: Img}}>{step.content}</Markdown>
      <Markdown components={{img: Img}}></Markdown>
      <p>{step.quiz?.type}</p>
      {step.quiz && <QuizRenderer quiz={step.quiz} isActive={isActive} />}
      {isActive && <button onClick={nextStep}>Next</button>}
    </div>
  );
}
