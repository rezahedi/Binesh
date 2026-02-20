import { QuizType, SectionType } from "@/lib/quizParser";
import LessonStepCard from "./LessonStepCard";
import { QuizValidationErrorMap } from "./quizzes/types";

type LessonBlocksEditorProps = {
  steps: SectionType[];
  onStepChange: (
    index: number,
    patch: { title?: string; content?: string; quiz?: QuizType | null }
  ) => void;
  stepErrors: Record<number, QuizValidationErrorMap>;
};

const LessonBlocksEditor = ({
  steps,
  onStepChange,
  stepErrors,
}: LessonBlocksEditorProps) => {
  if (steps.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        No steps found in this lesson content.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <LessonStepCard
          key={step.id}
          step={step}
          index={index}
          onStepChange={onStepChange}
          validationErrors={stepErrors[index] || {}}
        />
      ))}
    </div>
  );
};

export default LessonBlocksEditor;
