import { Button } from "@/components/ui/button";
import { PickAndFillQuizType } from "@/lib/quizParser";
import { cn } from "@/utils/cn";
import { PlusIcon, SquareCheckBigIcon, XIcon } from "lucide-react";
import TextareaBlock from "../../block/TextareaBlock";
import { QuizValidationErrorMap } from "../types";

type PickAndFillBlockProps = {
  value: PickAndFillQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: PickAndFillQuizType) => void;
};

const blankRegex = /\[(.*?)\]/g;

const contentToEditorText = (content: string, answers: string[]): string => {
  let answerIndex = 0;
  return content.replace(/\[\s*\]/g, () => {
    const answer = answers[answerIndex] || "";
    answerIndex += 1;
    return `[${answer}]`;
  });
};

type OptionProps = {
  id: number;
  value: string;
  answerIndex: number;
};
const mapOptions = (options: string[], answers: string[]): OptionProps[] => {
  const usedAnswerIndexes = new Set<number>();
  return options.map((option, index) => {
    const answerIndex = answers.findIndex(
      (answer, i) => answer === option && !usedAnswerIndexes.has(i)
    );

    if (answerIndex !== -1) {
      usedAnswerIndexes.add(answerIndex);
    }

    return {
      id: index,
      value: option,
      answerIndex,
    };
  });
};

const PickAndFillBlock = ({
  value,
  errors,
  onChange,
}: PickAndFillBlockProps) => {
  const displayText = contentToEditorText(value.content, value.answers);

  const newOptions: OptionProps[] = mapOptions(value.options, value.answers);

  const handleContentChange = (nextText: string) => {
    const nextAnswers = Array.from(nextText.matchAll(blankRegex)).map(
      (match) => match[1] || ""
    );
    const nextContent = nextText.replace(blankRegex, "[ ]");

    nextAnswers.forEach((answer, index) => {
      const existingIndex = newOptions.findIndex(
        (o) => o.answerIndex === index
      );
      if (existingIndex >= 0) {
        newOptions[existingIndex].value = answer;
      } else {
        newOptions.push({
          id: newOptions.length,
          value: answer,
          answerIndex: index,
        });
      }
    });

    const nextOptions = newOptions.map((option) => option.value);

    onChange({
      content: nextContent,
      answers: nextAnswers,
      options: nextOptions,
    });
  };

  const handleRemoveOption = (optionId: number) => {
    if (newOptions[optionId].answerIndex >= 0) return;

    const optionIndex = newOptions.findIndex((o) => o.id === optionId);

    const nextOptions = newOptions.toSpliced(optionIndex, 1);

    onChange({
      ...value,
      options: nextOptions.map((o) => o.value),
    });
  };

  const handleAddOption = () => {
    const newOption = `Option ${newOptions.length + 1}`;
    onChange({
      ...value,
      options: [...newOptions.map((o) => o.value), newOption],
    });
  };

  const handleOptionChange = (optionId: number, nextText: string) => {
    const optionIndex = newOptions.findIndex((o) => o.id === optionId);

    const nextOptions = [...newOptions];
    nextOptions[optionIndex].value = nextText;

    const nextAnswers = [...value.answers];
    const answerIndex = newOptions[optionIndex].answerIndex;
    if (answerIndex >= 0) {
      nextAnswers[answerIndex] = nextText;
    }

    onChange({
      ...value,
      answers: nextAnswers,
      options: nextOptions.map((o) => o.value),
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
        <div className="mt-6 flex flex-wrap gap-3">
          {newOptions.map((option) => (
            <div
              key={`${option.id}`}
              className={cn(
                "flex items-center gap-2 rounded-xl border-2 border-border p-1 px-4",
                option.answerIndex >= 0 && "border-quiz-success-dark"
              )}
            >
              {option.answerIndex >= 0 && (
                <SquareCheckBigIcon className="size-5" />
              )}
              <input
                value={option.value}
                onChange={(e) =>
                  handleOptionChange(option.id, e.currentTarget.value)
                }
                className=" field-sizing-content min-w-10 bg-transparent outline-none p-2"
                type="text"
              />
              {option.answerIndex === -1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-muted hover:text-foreground -mr-3"
                  title="Remove"
                  onClick={() => handleRemoveOption(option.id)}
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
        </div>
        {errors.options && (
          <p className="mt-1 text-xs text-destructive">{errors.options}</p>
        )}
      </div>
    </div>
  );
};

export default PickAndFillBlock;
