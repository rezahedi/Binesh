"use client";

import { GemIcon } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

export default function PointsButton() {
  const { points, isLoading } = useProgress();
  const { isMobile } = useMediaQuery();

  if (isLoading)
    return (
      <div
        className={cn(
          "flex gap-1 items-center font-semibold text-lg",
          isMobile && "hidden"
        )}
      >
        {" "}
        <GemIcon className="animate-pulse size-5 fill-muted/90" stroke="none" />
      </div>
    );

  if (points === null) return null;

  return (
    <button
      className={cn(
        "flex gap-1 items-center font-semibold text-lg",
        isMobile && "hidden"
      )}
    >
      {points.total}
      <GemIcon className="size-5 fill-primary/90" stroke="none" />
    </button>
  );
}
