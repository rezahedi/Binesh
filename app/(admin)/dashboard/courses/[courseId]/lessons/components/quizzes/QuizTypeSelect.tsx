import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  EDITABLE_QUIZ_LABELS,
  EDITABLE_QUIZ_TYPES,
  EditableQuizKind,
} from "./types";
import AddBlockButton from "../block/AddBlockButton";

type QuizTypeSelectProps = {
  onSelect: (value: EditableQuizKind) => void;
};

const QuizTypeSelect = ({ onSelect }: QuizTypeSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <AddBlockButton />
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-md p-4 bg-background shadow-xl">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {EDITABLE_QUIZ_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className="h-auto whitespace-normal rounded-md border border-border p-4 flex items-center justify-center cursor-pointer hover:bg-muted"
              onClick={() => {
                onSelect(type);
                setOpen(false);
              }}
            >
              {EDITABLE_QUIZ_LABELS[type]}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QuizTypeSelect;
