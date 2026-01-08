"use client";

import { LessonWithProgressProps } from "@/lib/types";
import { useSelectionSync } from "../SelectionSyncContext";
import { cn } from "@/utils/cn";
import LandingZone from "./LandingZone";

const treeClasses = ["self-center", "self-start", "self-center", "self-end"];

export default function LessonCard({
  lesson,
  index,
  isCompleted = false,
  locked = false,
}: {
  lesson: LessonWithProgressProps;
  index: number;
  isCompleted?: boolean;
  locked?: boolean;
}) {
  const { selection, setSelection } = useSelectionSync();
  const isSelected = selection && selection.id === lesson.id;

  const handleSelection = () => {
    setSelection({ ...lesson, locked });
  };

  return (
    <div key={lesson.id} className={`py-4 ${treeClasses[index % 4]} relative`}>
      <div className="group">
        <button
          onClick={handleSelection}
          className="flex gap-3 items-center cursor-pointer"
        >
          <LandingZone isActive={isCompleted} isFocused={isSelected} />
          <span
            className={cn(
              "text-base font-semibold w-44 text-balance text-left group-hover:text-primary",
              !isCompleted &&
                "text-foreground/40 group-hover:text-foreground/80",
              isSelected && "text-primary"
            )}
          >
            {lesson.name}
          </span>
        </button>
      </div>
    </div>
  );
}
