"use client";

import { GemIcon, ZapIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { useProgress } from "@/contexts/ProgressContext";
import CurrentWeekStreak from "./CurrentWeekStreak";
import ResponsivePopover from "@/components/ui/ResponsivePopover";

const MAIN_BUTTON_CLASSES =
  "flex items-center gap-0.5 p-2 px-3 rounded-full hover:bg-muted cursor-pointer font-semibold text-lg";

export default function StreakButton({ className }: { className?: string }) {
  const { streak, points, isLoading } = useProgress();

  if (isLoading && streak === null)
    return (
      <div className={cn(MAIN_BUTTON_CLASSES, className)}>
        {" "}
        <ZapIcon className="animate-pulse size-5 fill-muted/90 stroke-muted/90" />
      </div>
    );

  if (streak === null || points === null) return null;

  // If the streak expires today, it means it's not completed yet. If it's tomorrow or later, it means it's completed.
  const today = new Date().toLocaleDateString("en-CA");
  const isTodayStreakCompleted = streak.expires !== today;

  const message =
    streak.length === 0
      ? "Finish a lesson to start a streak"
      : !isTodayStreakCompleted
        ? "Finish a lesson to extend your streak!"
        : "Great job! Keep going!";

  return (
    <ResponsivePopover
      title="Streak & Points"
      button={
        <button className={cn(MAIN_BUTTON_CLASSES, className)}>
          {streak && (
            <>
              {streak.length}
              <ZapIcon
                className={cn(
                  "size-5 fill-muted/90 stroke-muted/90",
                  isTodayStreakCompleted &&
                    "fill-destructive/90 stroke-destructive/90"
                )}
              />
            </>
          )}
        </button>
      }
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <b className="font-bold text-5xl flex items-center gap-0.5">
            {streak.length}{" "}
            <ZapIcon
              className={cn(
                "size-10 fill-muted stroke-muted",
                isTodayStreakCompleted && "fill-destructive stroke-destructive"
              )}
            />
          </b>
          <b className="font-semibold text-lg">days streak</b>
          {streak.started && (
            <p className="text-muted-foreground text-sm">
              started on{" "}
              {new Date(streak.started).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "2-digit",
              })}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <b className="font-bold text-5xl flex items-center gap-0.5">
            <GemIcon className="size-10 fill-muted" stroke="none" />{" "}
            {points.total.toLocaleString()}
          </b>
          <b className="font-semibold text-lg">{points.name}</b>
        </div>
      </div>
      <CurrentWeekStreak
        history={streak.streakHistory}
        isTodayStreakCompleted
      />
      <p>{message}</p>
    </ResponsivePopover>
  );
}
