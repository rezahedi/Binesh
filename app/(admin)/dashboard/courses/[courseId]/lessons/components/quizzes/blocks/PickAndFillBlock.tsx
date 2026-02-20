import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PickAndFillQuizType } from "@/lib/quizParser";

type PickAndFillBlockProp = {
  value: PickAndFillQuizType;
  onChange: (next: PickAndFillQuizType) => void;
};

const joinLines = (items: string[]) => items.join("\n");
const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const PickAndFillBlock = ({ value, onChange }: PickAndFillBlockProp) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="pick-fill-options">Options (one per line)</Label>
        <Textarea
          id="pick-fill-options"
          rows={4}
          value={joinLines(value.options)}
          onChange={(e) =>
            onChange({ ...value, options: splitLines(e.target.value) })
          }
        />
      </div>
      <div>
        <Label htmlFor="pick-fill-answers">Answers (one per line)</Label>
        <Textarea
          id="pick-fill-answers"
          rows={3}
          value={joinLines(value.answers)}
          onChange={(e) =>
            onChange({ ...value, answers: splitLines(e.target.value) })
          }
        />
      </div>
      <div>
        <Label htmlFor="pick-fill-content">Blank Content</Label>
        <Textarea
          id="pick-fill-content"
          rows={3}
          value={value.content}
          onChange={(e) => onChange({ ...value, content: e.target.value })}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Use [ ] blanks and match their count with answers.
        </p>
      </div>
    </div>
  );
};

export default PickAndFillBlock;
