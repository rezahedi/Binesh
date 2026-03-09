import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EDITABLE_QUIZ, EDITABLE_QUIZ_TYPES, EditableQuizKind } from "./types";
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
        <div className="grid grid-cols-2 sm:grid-cols-3 auto-rows-fr">
          {EDITABLE_QUIZ_TYPES.map((type) => {
            const Icon = EDITABLE_QUIZ[type].icon;
            return (
              <button
                key={type}
                type="button"
                className="h-auto whitespace-normal rounded-md py-3 px-2 flex flex-col gap-2 items-center justify-start cursor-pointer hover:bg-accent/10 transition-all duration-100"
                onClick={() => {
                  onSelect(type);
                  setOpen(false);
                }}
              >
                <Icon className="size-10 text-accent" />
                <span className="text-balance text-sm">
                  {EDITABLE_QUIZ[type].label}
                </span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QuizTypeSelect;
