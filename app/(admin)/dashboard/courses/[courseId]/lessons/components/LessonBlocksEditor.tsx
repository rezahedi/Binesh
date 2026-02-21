import { QuizType, SectionType } from "@/lib/quizParser";
import StepCard from "./block/StepCard";
import SidebarFrame from "./preview/SidebarFrame";
import { QuizValidationErrorMap } from "./quizzes/types";
import BetweenButton from "./block/BetweenButton";

type LessonBlocksEditorProps = {
  steps: SectionType[];
  onStepChange: (
    index: number,
    patch: { title?: string; content?: string; quiz?: QuizType | null }
  ) => void;
  onAddStepAfter: (index: number) => void;
  onDuplicateStep: (index: number) => void;
  onRemoveStep: (index: number) => void;
  stepErrors: Record<number, QuizValidationErrorMap>;
  selectedStepIndex: number;
  onSelectStep: (index: number) => void;
};

const LessonBlocksEditor = ({
  steps,
  onStepChange,
  onAddStepAfter,
  onDuplicateStep,
  onRemoveStep,
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
          <div key={step.id} className="space-y-4">
            <StepCard
              step={step}
              index={index}
              onStepChange={onStepChange}
              validationErrors={stepErrors[index] || {}}
              isSelected={index === selectedStepIndex}
              onSelect={() => onSelectStep(index)}
              onDuplicateStep={() => onDuplicateStep(index)}
              onRemoveStep={() => onRemoveStep(index)}
            />
            <BetweenButton index={index} onAddStepAfter={onAddStepAfter} />
          </div>
        ))}
      </div>
      <SidebarFrame step={selectedStep} />
    </div>
  );
};

export default LessonBlocksEditor;
