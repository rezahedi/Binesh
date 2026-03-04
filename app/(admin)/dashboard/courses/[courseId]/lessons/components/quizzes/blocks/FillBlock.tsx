import { FillQuizType } from "@/lib/quizParser";
import { QuizValidationErrorMap } from "../types";
import TextareaBlock from "../../block/TextareaBlock";

type FillBlockProps = {
  value: FillQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: FillQuizType) => void;
};

const FillBlockProps = ({ value, errors, onChange }: FillBlockProps) => {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    const answerMatch = content.match(/\[(.*?)\]/);
    const answer = answerMatch ? answerMatch[1] : "";
    onChange({
      ...value,
      content: content.replace(/\[(.*?)\]/, "[ ]"),
      answer,
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <TextareaBlock
          label="Fill-in Content"
          rows={3}
          value={value.content.replace("[ ]", `[${value.answer}]`)}
          autoFocus
          onChange={handleContentChange}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Wrap a word in square brackets to indicate the blank: The capital of
          [France] is Paris.
        </p>
        {errors.content && (
          <p className="mt-1 text-xs text-destructive">{errors.content}</p>
        )}
        {errors.answer && (
          <p className="mt-1 text-xs text-destructive">{errors.answer}</p>
        )}
      </div>
    </div>
  );
};

export default FillBlockProps;
