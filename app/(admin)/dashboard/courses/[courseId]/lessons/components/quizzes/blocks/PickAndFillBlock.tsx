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

const sanitizeWords = (words: string[]): string[] => {
  return words.map((word) => word.trim()).filter(Boolean);
};

const contentToEditorText = (content: string, answers: string[]): string => {
  let answerIndex = 0;
  return content.replace(/\[\s*\]/g, () => {
    const answer = answers[answerIndex] || "";
    answerIndex += 1;
    return `[${answer}]`;
  });
};

const editorTextToQuiz = (text: string): PickAndFillQuizType => {
  const answers = sanitizeWords(
    Array.from(text.matchAll(blankRegex)).map((match) => match[1] || "")
  );
  const content = text.replace(blankRegex, "[ ]");

  return {
    content,
    answers,
    options: [...answers],
  };
};

const PickAndFillBlock = ({
  value,
  errors,
  onChange,
}: PickAndFillBlockProps) => {
  const displayText = contentToEditorText(value.content, value.answers);

  const handleContentChange = (nextText: string) => {
    onChange({
      ...value,
      ...editorTextToQuiz(nextText),
    });
  };

  const handleRemoveOption = (index: number) => {
    const nextOptions = value.options.filter((_, i) => i !== index);
    onChange({
      ...value,
      options: nextOptions,
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
          {value.options.map((option, index) => (
            <div
              key={`${index}-${option}`}
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
              <span className="min-w-0 grow truncate">{option}</span>
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
          {value.options.length === 0 && (
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
