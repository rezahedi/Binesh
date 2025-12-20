"use client";

import { cn } from "@/utils/cn";
import { useSelectionSync } from "../SelectionSyncContext";
import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/contexts/ProgressContext";
import NeedCellsPop from "./NeedCellsPop";
import { RotateCcwIcon } from "lucide-react";

const LessonPop = () => {
  const { selection: lesson } = useSelectionSync();
  const { cells, points } = useProgress();
  const popRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  if (!lesson || cells === null || points === null) return null;

  if (cells === 0) return <NeedCellsPop />;

  const handleStartClick = () => {
    router.push(`${pathname}/${lesson.slug}`);
  };

  const handleReviewClick = () => {
    // TODO: Navigate to lesson learning mode but show 100% progressbar, all steps (lesson's parts & quizzes with answers) in whole.
  };

  const handleRetakeClick = () => {
    // TODO: Open lesson learning mode for user to retake the lesson again
  };

  return (
    <div
      ref={popRef}
      className={cn(
        "sticky bottom-10 p-6 mt-20 rounded-xl overflow-hidden bg-background text-balance text-center shadow-2xl",
        "w-full md:w-md mx-auto border-[3px] border-b-[6px] border-accent/50 rounded-3xl"
      )}
    >
      <div className="flex flex-col gap-2 items-center">
        {/* <h3 className="text-xl font-bold">{lesson.name}</h3> */}
        <p>{lesson.description}</p>
        <p className="text-muted-foreground">
          Parts {lesson.part}
          <span className="mx-2">·</span>
          {lesson.exercises > 0 && (
            <>
              Exercises {lesson.exercises}
              <span className="mx-2">·</span>
            </>
          )}
          Time {lesson.estimatedDuration}m
        </p>
        {lesson.progress ? (
          <div className="flex gap-4 w-10/12">
            <Button
              onClick={handleReviewClick}
              variant={"outline"}
              className="grow font-semibold bg-muted border-transparent shadow-foreground/40"
            >
              Review
            </Button>
            <Button
              onClick={handleRetakeClick}
              variant={"outline"}
              size={"icon"}
              className="bg-muted border-transparent shadow-foreground/40 size-12"
            >
              <RotateCcwIcon />
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleStartClick}
            variant={"accent"}
            className="font-semibold w-10/12"
            disabled={lesson.locked}
          >
            Start Lesson
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonPop;
