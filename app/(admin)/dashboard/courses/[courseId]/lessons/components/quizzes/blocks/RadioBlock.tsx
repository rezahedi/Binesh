import { cn } from "@/utils/cn";
import { PlusIcon, CircleIcon, XIcon, CircleCheckBigIcon } from "lucide-react";
import { RadioQuizType } from "@/lib/quizParser";
import { QuizValidationErrorMap } from "../types";
import { Button } from "@/components/ui/button";

type RadioBlockProps = {
  value: RadioQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: RadioQuizType) => void;
};

const RadioBlock = ({ value, errors, onChange }: RadioBlockProps) => {
  const handleSelectAnswer = (index: number) => {
    const option = value.options[index];
    if (!option) return;
    onChange({
      ...value,
      answer: option,
    });
  };

  const handleOptionChange = (index: number, nextText: string) => {
    const previousOption = value.options[index] || "";
    const nextOptions = [...value.options];
    nextOptions[index] = nextText;

    const nextAnswer =
      value.answer === previousOption ? nextText : value.answer;

    onChange({
      ...value,
      options: nextOptions,
      answer: nextAnswer,
    });
  };

  const handleRemoveOption = (index: number) => {
    const optionToRemove = value.options[index];
    if (typeof optionToRemove !== "string") return;

    onChange({
      ...value,
      options: value.options.filter((_, i) => i !== index),
      answer: value.answer === optionToRemove ? "" : value.answer,
    });
  };

  const handleAddOption = () => {
    const nextIndex = value.options.length + 1;
    onChange({
      ...value,
      options: [...value.options, `Option ${nextIndex}`],
    });
  };

  return (
    <div className="space-y-3">
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {value.options.map((option, index) => {
          const isCorrect = value.answer === option;

          return (
            <div
              key={`${index}`}
              className={cn(
                "flex items-center gap-2 rounded-xl border-2 border-border p-3 transition-colors",
                isCorrect && "border-quiz-success-dark"
              )}
            >
              <button
                type="button"
                onClick={() => handleSelectAnswer(index)}
                className="cursor-pointer"
              >
                {isCorrect ? <CircleCheckBigIcon /> : <CircleIcon />}
              </button>
              <input
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, e.currentTarget.value)
                }
                className="min-w-0 grow bg-transparent outline-none"
                type="text"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Remove option"
                onClick={() => handleRemoveOption(index)}
              >
                <XIcon className="size-4" />
              </Button>
            </div>
          );
        })}
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-border p-3 text-muted-foreground hover:text-foreground"
          onClick={handleAddOption}
        >
          <PlusIcon className="size-4" />
          Add option
        </button>
      </div>
      {errors.options && (
        <p className="mt-1 text-xs text-destructive">{errors.options}</p>
      )}
      {errors.answer && (
        <p className="mt-1 text-xs text-destructive">{errors.answer}</p>
      )}
    </div>
  );
};

export default RadioBlock;
