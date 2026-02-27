import { SentenceBuilderQuizType } from "@/lib/quizParser";
import { QuizValidationErrorMap } from "../types";
import TextareaBlock from "../../block/TextareaBlock";

type SentenceBuilderBlockProps = {
  value: SentenceBuilderQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: SentenceBuilderQuizType) => void;
};

const joinOptions = (items: string[]) => items.join("|");
const splitOptions = (value: string) => value.split("|");

const SentenceBuilderBlock = ({
  value,
  errors,
  onChange,
}: SentenceBuilderBlockProps) => {
  return (
    <div className="space-y-3">
      <div>
        <TextareaBlock
          label="Sentence Builder Content"
          rows={4}
          value={joinOptions(value.options)}
          onChange={(e) =>
            onChange({ ...value, options: splitOptions(e.target.value) })
          }
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Type the correct sentence and split parts with |. Example: This is| my
          |simple | example.
        </p>
        {errors.options && (
          <p className="mt-1 text-xs text-destructive">{errors.options}</p>
        )}
      </div>
    </div>
  );
};

export default SentenceBuilderBlock;
