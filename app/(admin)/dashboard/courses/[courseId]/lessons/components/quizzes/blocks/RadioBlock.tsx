import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioQuizType } from "@/lib/quizParser";
import { QuizValidationErrorMap } from "../types";

type RadioBlockProps = {
  value: RadioQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: RadioQuizType) => void;
};

const joinLines = (items: string[]) => items.join("\n");
const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const RadioBlock = ({ value, errors, onChange }: RadioBlockProps) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="radio-options">Options (one per line)</Label>
        <Textarea
          id="radio-options"
          rows={4}
          value={joinLines(value.options)}
          onChange={(e) =>
            onChange({ ...value, options: splitLines(e.target.value) })
          }
        />
        {errors.options && (
          <p className="mt-1 text-xs text-destructive">{errors.options}</p>
        )}
      </div>
      <div>
        <Label htmlFor="radio-answer">Answer</Label>
        <Input
          id="radio-answer"
          value={value.answer}
          onChange={(e) => onChange({ ...value, answer: e.target.value })}
        />
        {errors.answer && (
          <p className="mt-1 text-xs text-destructive">{errors.answer}</p>
        )}
      </div>
    </div>
  );
};

export default RadioBlock;
