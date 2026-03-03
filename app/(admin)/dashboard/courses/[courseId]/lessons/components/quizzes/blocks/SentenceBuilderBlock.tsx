import { SentenceBuilderQuizType } from "@/lib/quizParser";
import { QuizValidationErrorMap } from "../types";
import TextareaBlock from "../../block/TextareaBlock";

const SPECIAL_CHAR = "|"; //"\u00A0";

type SentenceBuilderBlockProps = {
  value: SentenceBuilderQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: SentenceBuilderQuizType) => void;
};

const joinOptions = (items: string[]) => items.join(SPECIAL_CHAR);
const splitOptions = (value: string) => value.split(SPECIAL_CHAR);

const shuffle = (items: string[]) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const SentenceBuilderBlock = ({
  value,
  errors,
  onChange,
}: SentenceBuilderBlockProps) => {
  const specialCharListener = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && e.code === "Space") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue =
        textarea.value.substring(0, start) +
        SPECIAL_CHAR +
        textarea.value.substring(end);
      textarea.value = newValue;
      // move cursor to after the inserted character
      textarea.selectionStart = textarea.selectionEnd = start + 1;

      // trigger change event
      handleChange({
        target: textarea,
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const answer = splitOptions(inputValue);
    onChange({ ...value, answer, options: shuffle(answer) });
  };

  return (
    <div className="space-y-3">
      <div>
        <TextareaBlock
          label="Sentence"
          rows={4}
          value={joinOptions(value.answer || value.options)}
          onKeyDown={specialCharListener}
          onChange={handleChange}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Type the correct sentence and split parts with |. Example: This is| my
          |simple | example.
        </p>
        {errors.parts && (
          <p className="mt-1 text-xs text-destructive">{errors.parts}</p>
        )}
      </div>
    </div>
  );
};

export default SentenceBuilderBlock;
