"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { useSelectionSync } from "../SelectionSyncContext";
import { useRef } from "react";
import { usePathname } from "next/navigation";

const LessonPop = () => {
  const { selection: lesson } = useSelectionSync();
  const popRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  if (!lesson) return null;

  return (
    <div
      ref={popRef}
      className={cn(
        "sticky bottom-10 p-6 rounded-xl overflow-hidden bg-background text-balance text-center shadow-2xl",
        "w-md mx-auto border-[3px] border-b-[6px] border-accent rounded-3xl"
      )}
    >
      <div className="flex flex-col gap-2 items-center">
        {/* <h3 className="text-xl font-bold">{lesson.name}</h3> */}
        <p>{lesson.description}</p>
        <p className="text-muted-foreground">
          Unit {lesson.unit} <span className="mx-2">·</span> Time{" "}
          {lesson.duration}m
        </p>
        <Link
          href={`${pathname}/${lesson.slug}`}
          className={cn(
            "font-semibold rounded-full text-accent border-2 border-accent py-2 px-8",
            "border-b-[6px] active:border-b-2 active:mt-1"
          )}
        >
          Start Lesson
        </Link>
      </div>
    </div>
  );
};

export default LessonPop;
