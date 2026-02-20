import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckListQuizType } from "@/lib/quizParser";

type CheckListBlockProps = {
  value: CheckListQuizType;
  onChange: (next: CheckListQuizType) => void;
};

const joinLines = (items: string[]) => items.join("\n");
const splitLines = (value: string): string[] =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const CheckListBlock = ({ value, onChange }: CheckListBlockProps) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="checklist-options">Options (one per line)</Label>
        <Textarea
          id="checklist-options"
          rows={4}
          value={joinLines(value.options)}
          onChange={(e) =>
            onChange({ ...value, options: splitLines(e.target.value) })
          }
        />
      </div>
      <div>
        <Label htmlFor="checklist-answers">
          Correct Answers (one per line)
        </Label>
        <Textarea
          id="checklist-answers"
          rows={3}
          value={joinLines(value.answers)}
          onChange={(e) =>
            onChange({ ...value, answers: splitLines(e.target.value) })
          }
        />
      </div>
    </div>
  );
};

export default CheckListBlock;
