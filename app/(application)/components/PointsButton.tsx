"use client";

import { GemIcon } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function PointsButton() {
  const { points, isLoading } = useProgress();
  const { isMobile } = useMediaQuery();

  if (isMobile) return null;

  if (isLoading)
    return (
      <div className="flex gap-1 items-center font-semibold text-lg">
        {" "}
        <GemIcon className="animate-pulse size-5 fill-muted/90" stroke="none" />
      </div>
    );

  if (points === null) return null;

  return (
    <button className="flex gap-1 items-center font-semibold text-lg">
      {points.total}
      <GemIcon className="size-5 fill-primary/90" stroke="none" />
    </button>
  );
}
