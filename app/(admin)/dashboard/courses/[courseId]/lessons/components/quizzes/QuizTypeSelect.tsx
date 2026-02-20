import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EDITABLE_QUIZ_LABELS,
  EDITABLE_QUIZ_TYPES,
  EditableQuizKind,
} from "./types";

type QuizTypeSelectProps = {
  value: EditableQuizKind;
  onChange: (value: EditableQuizKind) => void;
};

const QuizTypeSelect = ({ value, onChange }: QuizTypeSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={(nextValue) => {
        if (!EDITABLE_QUIZ_TYPES.includes(nextValue as EditableQuizKind))
          return;
        onChange(nextValue as EditableQuizKind);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select quiz type" />
      </SelectTrigger>
      <SelectContent>
        {EDITABLE_QUIZ_TYPES.map((type) => (
          <SelectItem key={type} value={type}>
            {EDITABLE_QUIZ_LABELS[type]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default QuizTypeSelect;
