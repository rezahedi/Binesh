import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  EDITABLE_QUIZ,
  EditableQuizKind,
  ADDABLE_QUIZ_TYPES,
  DUMMY_INTERACTIVE_COMPONENTS,
} from "./types";
import AddBlockButton from "../block/AddBlockButton";

type ComponentCollectionProps = {
  onSelect: (data: { type: EditableQuizKind; componentName?: string }) => void;
};

const ComponentCollection = ({ onSelect }: ComponentCollectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <AddBlockButton />
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-md p-4 bg-background shadow-xl">
        <div className="space-y-4">
          <div className="text-xs text-muted-foreground">Quizzes</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 auto-rows-fr">
            {ADDABLE_QUIZ_TYPES.map((type) => {
              const Icon = EDITABLE_QUIZ[type].icon;
              return (
                <button
                  key={type}
                  type="button"
                  className="h-auto whitespace-normal rounded-md py-3 px-2 flex flex-col gap-2 items-center justify-start cursor-pointer hover:bg-accent/10 transition-all duration-100"
                  onClick={() => {
                    onSelect({ type });
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
          <div className="text-xs text-muted-foreground">
            Interactive Components
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 auto-rows-fr">
            {DUMMY_INTERACTIVE_COMPONENTS.map((component) => {
              const Icon = component.icon;
              return (
                <button
                  key={component.name}
                  type="button"
                  className="h-auto whitespace-normal rounded-md py-3 px-2 flex flex-col gap-2 items-center justify-start cursor-pointer hover:bg-accent/10 transition-all duration-100"
                  onClick={() => {
                    onSelect({
                      type: "component",
                      componentName: component.name,
                    });
                    setOpen(false);
                  }}
                >
                  <Icon className="size-10 text-accent" />
                  <span className="text-balance text-sm">
                    {component.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ComponentCollection;
