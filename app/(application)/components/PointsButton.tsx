"use client";

import { GemIcon } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

export default function PointsButton() {
  const { points, isLoading } = useProgress();

  return (
    <button className="relative flex gap-1 items-center font-semibold text-lg">
      {isLoading && <>...</>}
      {!isLoading && points && (
        <>
          {points.total}
          <GemIcon className="fill-primary/90" stroke="none" />
        </>
      )}
    </button>
  );
}
