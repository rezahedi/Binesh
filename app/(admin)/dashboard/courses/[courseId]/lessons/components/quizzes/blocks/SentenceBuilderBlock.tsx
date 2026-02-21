import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SentenceBuilderQuizType } from "@/lib/quizParser";
import { QuizValidationErrorMap } from "../types";

type SentenceBuilderBlockProps = {
  value: SentenceBuilderQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: SentenceBuilderQuizType) => void;
};

const joinLines = (items: string[]) => items.join("\n");
const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const SentenceBuilderBlock = ({
  value,
  errors,
  onChange,
}: SentenceBuilderBlockProps) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="sentence-builder-options">Options (one per line)</Label>
        <Textarea
          id="sentence-builder-options"
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
    </div>
  );
};

export default SentenceBuilderBlock;
