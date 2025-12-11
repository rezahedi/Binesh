"use client";

import { GemIcon } from "lucide-react";
import useTrophy from "../useTrophy";

export default function PointsButton() {
  const { points, isLoading } = useTrophy();

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
