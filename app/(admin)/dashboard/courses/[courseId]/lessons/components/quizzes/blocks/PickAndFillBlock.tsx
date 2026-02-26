import { Button } from "@/components/ui/button";
import { PickAndFillQuizType } from "@/lib/quizParser";
import { cn } from "@/utils/cn";
import { PlusIcon, SquareCheckBigIcon, SquareIcon, XIcon } from "lucide-react";
import TextareaBlock from "../../block/TextareaBlock";
import { QuizValidationErrorMap } from "../types";

type PickAndFillBlockProps = {
  value: PickAndFillQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: PickAndFillQuizType) => void;
};

const blankRegex = /\[(.*?)\]/g;

const extractManualOptions = (
  answers: string[],
  options: string[]
): string[] => {
  const remaining = [...options];

  answers.forEach((answer) => {
    const answerIndex = remaining.indexOf(answer);
    if (answerIndex >= 0) {
      remaining.splice(answerIndex, 1);
    }
  });

  return remaining;
};

const contentToEditorText = (content: string, answers: string[]): string => {
  let answerIndex = 0;
  return content.replace(/\[\s*\]/g, () => {
    const answer = answers[answerIndex] || "";
    answerIndex += 1;
    return `[${answer}]`;
  });
};

const PickAndFillBlock = ({
  value,
  errors,
  onChange,
}: PickAndFillBlockProps) => {
  const displayText = contentToEditorText(value.content, value.answers);
  const options = [
    ...value.answers,
    ...extractManualOptions(value.answers, value.options),
  ];

  const handleContentChange = (nextText: string) => {
    const nextAnswers = Array.from(nextText.matchAll(blankRegex)).map(
      (match) => match[1] || ""
    );
    const nextContent = nextText.replace(blankRegex, "[ ]");
    const manualOptions = extractManualOptions(value.answers, value.options);

    onChange({
      content: nextContent,
      answers: nextAnswers,
      options: [...nextAnswers, ...manualOptions],
    });
  };

  const handleRemoveOption = (index: number) => {
    if (index < value.answers.length) return;

    const manualIndex = index - value.answers.length;
    const manualOptions = extractManualOptions(value.answers, value.options);
    const nextManualOptions = manualOptions.filter(
      (_, optionIndex) => optionIndex !== manualIndex
    );
    onChange({
      ...value,
      options: [...value.answers, ...nextManualOptions],
    });
  };

  const handleAddOption = () => {
    const nextIndex = options.length + 1;
    onChange({
      ...value,
      options: [...options, `Option ${nextIndex}`],
    });
  };

  const handleOptionChange = (index: number, nextText: string) => {
    if (index < value.answers.length) {
      const nextAnswers = [...value.answers];
      nextAnswers[index] = nextText;
      const manualOptions = extractManualOptions(value.answers, value.options);
      onChange({
        ...value,
        answers: nextAnswers,
        options: [...nextAnswers, ...manualOptions],
      });
      return;
    }

    const manualIndex = index - value.answers.length;
    const manualOptions = extractManualOptions(value.answers, value.options);
    const nextManualOptions = [...manualOptions];
    nextManualOptions[manualIndex] = nextText;
    onChange({
      ...value,
      options: [...value.answers, ...nextManualOptions],
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <TextareaBlock
          label="Pick-and-fill Content"
          rows={4}
          value={displayText}
          onChange={(e) => handleContentChange(e.target.value)}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Type your sentence and wrap answer words in square brackets. Example:
          I [love] coding in [TypeScript].
        </p>
        {errors.content && (
          <p className="mt-1 text-xs text-destructive">{errors.content}</p>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          Answer words
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          {options.map((option, index) => (
            <div
              key={`${index}`}
              className={cn(
                "flex items-center gap-2 rounded-xl border-2 border-border p-1 px-4",
                value.answers.includes(option) && "border-quiz-success-dark"
              )}
            >
              {value.answers.includes(option) ? (
                <SquareCheckBigIcon className="size-5" />
              ) : (
                <SquareIcon className="size-5 text-muted-foreground" />
              )}
              <input
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, e.currentTarget.value)
                }
                className=" field-sizing-content min-w-10 bg-transparent outline-none p-2"
                type="text"
              />
              {!value.answers.includes(option) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-muted hover:text-foreground -mr-3"
                  title="Remove"
                  onClick={() => handleRemoveOption(index)}
                >
                  <XIcon className="size-4" />
                </Button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border-2 border-dashed border-border p-3 px-4 text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={handleAddOption}
          >
            <PlusIcon className="size-4" />
            Add option
          </button>
          {options.length === 0 && (
            <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-border p-3 text-muted-foreground">
              <PlusIcon className="size-4" />
              Add bracketed words in content to create answers
            </div>
          )}
        </div>
        {errors.answers && (
          <p className="mt-1 text-xs text-destructive">{errors.answers}</p>
        )}
        {errors.options && (
          <p className="mt-1 text-xs text-destructive">{errors.options}</p>
        )}
      </div>
    </div>
  );
};

export default PickAndFillBlock;
