import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SentenceBuilderQuizType } from "@/lib/quizParser";

type SentenceBuilderBlockProps = {
  value: SentenceBuilderQuizType;
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
      </div>
    </div>
  );
};

export default SentenceBuilderBlock;
