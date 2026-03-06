import { QuizType, SectionType } from "@/lib/quizParser";
import StepCard from "./block/StepCard";
import SidebarFrame from "./preview/SidebarFrame";
import { QuizValidationErrorMap } from "./quizzes/types";
import AddBlockButton from "./block/AddBlockButton";

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
  const selectedStep = steps[selectedStepIndex] || null;

  if (steps.length === 0)
    return (
      <div className="flex items-start gap-3">
        <div className="min-w-0 grow space-y-4">
          <div className="rounded-md bg-muted p-3 py-30 space-y-4">
            <div className="text-muted-foreground text-3xl text-center font-semibold">
              Create your first step.
            </div>
            <AddBlockButton onClick={() => onAddStepAfter(0)} />
          </div>
        </div>
        <SidebarFrame step={selectedStep} />
      </div>
    );

  return (
    <div className="flex items-start gap-3">
      <div className="min-w-0 grow space-y-4">
        <AddBlockButton onClick={() => onAddStepAfter(-1)} />
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
            <AddBlockButton onClick={() => onAddStepAfter(index)} />
          </div>
        ))}
      </div>
      <SidebarFrame step={selectedStep} />
    </div>
  );
};

export default LessonBlocksEditor;
