"use client";

import { LessonsProps } from "@/lib/types";
import Image from "next/image";
import { useSelectionSync } from "../SelectionSyncContext";
import { cn } from "@/utils/cn";

const treeClasses = ["self-center", "self-start", "self-center", "self-end"];

export default function LessonCard({
  lesson,
  index,
}: {
  lesson: LessonsProps;
  index: number;
}) {
  const { selection, setSelection } = useSelectionSync();

  const handleSelection = () => {
    setSelection(lesson);
  };

  return (
    <div key={lesson.id} className={`py-4 ${treeClasses[index % 4]} relative`}>
      <div className="group">
        <button
          onClick={handleSelection}
          className="flex gap-3 items-center cursor-pointer"
        >
          <span className="bg-[url('/assets/landing_zone.svg')] size-24">
            <Image
              src={"/assets/alien-ship.svg"}
              width={30}
              height={30}
              alt="Alien Ship"
              className={cn(
                "mt-3 opacity-0 transition-opacity duration-100 block animate-bounce size-10 mx-auto",
                selection && selection?.id === lesson.id && "opacity-100"
              )}
            />
          </span>
          <span className="text-base font-semibold w-44 text-balance text-left">
            {lesson.name}
          </span>
        </button>
      </div>
    </div>
  );
}
