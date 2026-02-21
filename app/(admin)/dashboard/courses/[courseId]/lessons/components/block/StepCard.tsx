import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuizType, SectionType } from "@/lib/quizParser";
import { cn } from "@/utils/cn";
import QuizEditor from "../quizzes/QuizEditor";
import { QuizValidationErrorMap } from "../quizzes/types";
import { CopyPlusIcon, TrashIcon } from "lucide-react";

type StepCardProps = {
  index: number;
  step: SectionType;
  onStepChange: (
    index: number,
    patch: { title?: string; content?: string; quiz?: QuizType | null }
  ) => void;
  validationErrors: QuizValidationErrorMap;
  isSelected: boolean;
  onSelect: () => void;
  onDuplicateStep: () => void;
  onRemoveStep: () => void;
};

const StepCard = ({
  index,
  step,
  onStepChange,
  validationErrors,
  isSelected,
  onSelect,
  onDuplicateStep,
  onRemoveStep,
}: StepCardProps) => {
  const hasQuizErrors = Object.keys(validationErrors).length > 0;

  return (
    <div
      className={cn(
        "space-y-3 rounded-md border p-4 transition-colors",
        isSelected ? "border-primary ring-1 ring-primary/30 bg-primary/5" : ""
      )}
      role="button"
      tabIndex={0}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Step {index + 1}</h4>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="link"
            size="icon"
            title="Duplicate Step"
            className="text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicateStep();
            }}
          >
            <CopyPlusIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="link"
            size="icon"
            className="text-muted-foreground hover:text-destructive hover:bg-muted"
            title="Remove step"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveStep();
            }}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
          {hasQuizErrors && (
            <p className="text-xs font-medium text-destructive">Quiz invalid</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor={`step-title-${step.id}`}>Title</Label>
        <Input
          id={`step-title-${step.id}`}
          value={step.title}
          onChange={(e) => onStepChange(index, { title: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor={`step-content-${step.id}`}>Content</Label>
        <Textarea
          id={`step-content-${step.id}`}
          value={step.content}
          onChange={(e) => onStepChange(index, { content: e.target.value })}
          rows={6}
          className="resize-y"
        />
      </div>
      <QuizEditor
        quiz={step.quiz}
        onChange={(quiz) => onStepChange(index, { quiz })}
        errors={validationErrors}
      />
    </div>
  );
};

export default StepCard;
