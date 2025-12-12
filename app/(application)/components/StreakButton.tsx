"use client";

import { GemIcon, ZapIcon } from "lucide-react";
import useTrophy from "@/hooks/useTrophy";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/cn";

const MAIN_BUTTON_CLASSES =
  "flex items-center gap-0.5 p-2 px-3 rounded-full hover:bg-muted cursor-pointer font-semibold text-lg";
const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function StreakButton({ className }: { className?: string }) {
  const { streak, points } = useTrophy();

  if (streak === null || points === null)
    return (
      <div className={cn(MAIN_BUTTON_CLASSES, className)}>
        {" "}
        <ZapIcon className="animate-pulse size-5 fill-muted/90 stroke-muted/90" />
      </div>
    );

  const message =
    streak.length === 0
      ? "Finish a lesson to start a streak"
      : "Finish a lesson to extend your streak!";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={cn(MAIN_BUTTON_CLASSES, className)}>
          {streak && (
            <>
              {streak.length}
              <ZapIcon className="size-5 fill-destructive/90 stroke-destructive/90" />
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit flex flex-col gap-5 bg-background shadow-xl py-6 px-8">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <b className="font-bold text-5xl flex items-center gap-0.5">
              {streak.length}{" "}
              <ZapIcon className="size-10 fill-muted stroke-muted" />
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
              <GemIcon className="size-10 fill-muted" stroke="0" />{" "}
              {points.total.toLocaleString()}
            </b>
            <b className="font-semibold text-lg">{points.name}</b>
          </div>
        </div>
        <div className="flex justify-around gap-1.5 text-center text-sm text-border">
          {WEEK_DAYS.map((day, i) => (
            <div
              key={day}
              className={cn(
                i < 2 &&
                  "[&_div]:border-destructive [&_svg]:fill-destructive [&_svg]:stroke-destructive text-foreground"
              )}
            >
              <div
                className={
                  "size-9 flex justify-center items-center border border-muted rounded-full mb-1"
                }
              >
                <ZapIcon className="size-5 fill-muted/90 stroke-muted/90" />
              </div>
              {day}
            </div>
          ))}
        </div>
        <p>{message}</p>
      </PopoverContent>
    </Popover>
  );
}
