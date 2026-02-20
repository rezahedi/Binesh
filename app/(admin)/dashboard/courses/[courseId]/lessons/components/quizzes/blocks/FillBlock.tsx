import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FillQuizType } from "@/lib/quizParser";

type FillBlockProps = {
  value: FillQuizType;
  onChange: (next: FillQuizType) => void;
};

const FillBlockProps = ({ value, onChange }: FillBlockProps) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="fill-input-type">Input Type</Label>
        <select
          id="fill-input-type"
          className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          value={value.inputType}
          onChange={(e) => onChange({ ...value, inputType: e.target.value })}
        >
          <option value="string">string</option>
          <option value="number">number</option>
        </select>
      </div>
      <div>
        <Label htmlFor="fill-answer">Answer</Label>
        <Input
          id="fill-answer"
          value={value.answer}
          onChange={(e) => onChange({ ...value, answer: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="fill-content">Blank Content</Label>
        <Textarea
          id="fill-content"
          rows={3}
          value={value.content}
          onChange={(e) => onChange({ ...value, content: e.target.value })}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Use [ ] as the blank placeholder.
        </p>
      </div>
    </div>
  );
};

export default FillBlockProps;
