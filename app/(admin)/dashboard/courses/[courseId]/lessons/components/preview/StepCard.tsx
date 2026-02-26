import ReactMarkdown from "@/lib/markdown";
import { SectionType } from "@/lib/quizParser";
import Quiz from "./Quiz";

const StepCard = ({ step }: { step: SectionType | null }) => {
  if (!step) {
    return (
      <div className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">
        Select a step to preview it.
      </div>
    );
  }

  if (step.content === "" && !step.quiz)
    return (
      <div className="rounded-lg bg-muted text-muted-foreground p-4 py-30 text-center">
        Blank step, nothing to preview.
      </div>
    );

  return (
    <div className="h-full overflow-auto">
      <ReactMarkdown>{step.content}</ReactMarkdown>
      {step.quiz && <Quiz key={`${step.id}-${step.quiz.type}`} step={step} />}
    </div>
  );
};

export default StepCard;
