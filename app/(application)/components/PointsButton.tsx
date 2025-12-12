"use client";

import { GemIcon } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

export default function PointsButton() {
  const { points, isLoading } = useProgress();

  if (isLoading)
    return (
      <div className="flex gap-1 items-center font-semibold text-lg">
        {" "}
        <GemIcon className="animate-pulse size-5 fill-muted/90" stroke="0" />
      </div>
    );

  if (points === null) return null;

  return (
    <button className="flex gap-1 items-center font-semibold text-lg">
      {points.total}
      <GemIcon className="size-5 fill-primary/90" stroke="0" />
    </button>
  );
}
