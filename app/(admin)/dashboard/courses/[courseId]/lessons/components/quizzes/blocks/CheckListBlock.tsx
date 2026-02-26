import { Button } from "@/components/ui/button";
import { CheckListQuizType } from "@/lib/quizParser";
import { cn } from "@/utils/cn";
import { PlusIcon, SquareCheckBigIcon, SquareIcon, XIcon } from "lucide-react";
import { QuizValidationErrorMap } from "../types";

type CheckListBlockProps = {
  value: CheckListQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: CheckListQuizType) => void;
};

const sanitizeAnswers = (answers: string[]): string[] => {
  return Array.from(new Set(answers.filter(Boolean)));
};

const CheckListBlock = ({ value, errors, onChange }: CheckListBlockProps) => {
  const handleToggleAnswer = (index: number, checked: boolean) => {
    console.log({ index, checked });
    const option = value.options[index];
    if (!option) return;

    const nextAnswers = checked
      ? [...value.answers, option]
      : value.answers.filter((answer) => answer !== option);

    onChange({
      ...value,
      answers: sanitizeAnswers(nextAnswers),
    });
  };

  const handleOptionChange = (index: number, nextText: string) => {
    const previousOption = value.options[index] || "";
    const nextOptions = [...value.options];
    nextOptions[index] = nextText;

    const nextAnswers = value.answers.map((answer) =>
      answer === previousOption ? nextText : answer
    );

    onChange({
      ...value,
      options: nextOptions,
      answers: sanitizeAnswers(nextAnswers),
    });
  };

  const handleRemoveOption = (index: number) => {
    const optionToRemove = value.options[index];
    if (typeof optionToRemove !== "string") return;

    onChange({
      ...value,
      options: value.options.filter((_, i) => i !== index),
      answers: value.answers.filter((answer) => answer !== optionToRemove),
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
          const isCorrect = value.answers.includes(option);

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
                onClick={() => handleToggleAnswer(index, !isCorrect)}
                className="cursor-pointer"
              >
                {isCorrect ? <SquareCheckBigIcon /> : <SquareIcon />}
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
          className="flex items-center gap-2 rounded-xl border-2 border-dashed border-border p-3 text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={handleAddOption}
        >
          <PlusIcon className="size-4" />
          Add option
        </button>
      </div>
      {errors.options && (
        <p className="mt-1 text-xs text-destructive">{errors.options}</p>
      )}
      {errors.answers && (
        <p className="mt-1 text-xs text-destructive">{errors.answers}</p>
      )}
    </div>
  );
};

export default CheckListBlock;
