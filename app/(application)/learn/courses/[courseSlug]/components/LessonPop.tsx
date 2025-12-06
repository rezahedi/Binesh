"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { useSelectionSync } from "../SelectionSyncContext";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const LessonPop = () => {
  const { selection: lesson, setSelection } = useSelectionSync();
  const popRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!popRef || !setSelection) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setSelection(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSelection]);

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
          className="mt-2 font-semibold rounded-full text-accent border-2 border-accent py-2 px-8 transition active:scale-95
            "
        >
          Start Lesson
        </Link>
      </div>
    </div>
  );
};

export default LessonPop;
