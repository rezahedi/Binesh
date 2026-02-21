import { QuizType, SectionType } from "@/lib/quizParser";
import LessonStepCard from "./LessonStepCard";
import SidebarFrame from "./preview/SidebarFrame";
import { QuizValidationErrorMap } from "./quizzes/types";

type LessonBlocksEditorProps = {
  steps: SectionType[];
  onStepChange: (
    index: number,
    patch: { title?: string; content?: string; quiz?: QuizType | null }
  ) => void;
  stepErrors: Record<number, QuizValidationErrorMap>;
  selectedStepIndex: number;
  onSelectStep: (index: number) => void;
};

const LessonBlocksEditor = ({
  steps,
  onStepChange,
  stepErrors,
  selectedStepIndex,
  onSelectStep,
}: LessonBlocksEditorProps) => {
  if (steps.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        No steps found in this lesson content.
      </div>
    );
  }

  const selectedStep = steps[selectedStepIndex] || null;

  return (
    <div className="flex items-start gap-3">
      <div className="min-w-0 grow space-y-4">
        {steps.map((step, index) => (
          <LessonStepCard
            key={step.id}
            step={step}
            index={index}
            onStepChange={onStepChange}
            validationErrors={stepErrors[index] || {}}
            isSelected={index === selectedStepIndex}
            onSelect={() => onSelectStep(index)}
          />
        ))}
      </div>
      <SidebarFrame step={selectedStep} />
    </div>
  );
};

export default LessonBlocksEditor;
