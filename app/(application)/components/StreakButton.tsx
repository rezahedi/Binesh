"use client";

import { ZapIcon } from "lucide-react";
import useTrophy from "../useTrophy";

export default function StreakButton() {
  const { streak, isLoading } = useTrophy();

  return (
    <button className="relative flex gap-1 items-center font-semibold text-lg">
      {isLoading && <>...</>}
      {!isLoading && streak && (
        <>
          {streak.length}
          <ZapIcon className="fill-destructive/90" stroke="none" />
        </>
      )}
    </button>
  );
}
