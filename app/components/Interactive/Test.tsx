import { cn } from "@/utils/cn";
import { useState } from "react";

const Test = () => {
  const [selected, setSelected] = useState<{
    first: boolean;
    second: boolean;
    third: boolean;
  }>({ first: false, second: false, third: false });

  return (
    <svg
      viewBox="0, 0, 100, 100"
      xmlns="http://www.w3.org/2000/svg"
      className="aspect-10/8 sm:aspect-14/10"
    >
      <g transform="translate(20, 20)">
        <rect
          x="0"
          y="0"
          width="20"
          height="60"
          fill="white"
          strokeWidth={1}
          stroke="black"
          className={cn(
            "cursor-pointer hover:fill-amber-100",
            selected.first && "fill-amber-200"
          )}
          onClick={() =>
            setSelected((prev) => ({ ...prev, first: !prev.first }))
          }
        />
        <rect
          x="20"
          y="0"
          width="20"
          height="60"
          fill="white"
          strokeWidth={1}
          stroke="black"
          className={cn(
            "cursor-pointer hover:fill-amber-100",
            selected.second && "fill-amber-200"
          )}
          onClick={() =>
            setSelected((prev) => ({ ...prev, second: !prev.second }))
          }
        />
        <rect
          x="40"
          y="0"
          width="20"
          height="60"
          fill="white"
          strokeWidth={1}
          stroke="black"
          className={cn(
            "cursor-pointer hover:fill-amber-100",
            selected.third && "fill-amber-200"
          )}
          onClick={() =>
            setSelected((prev) => ({ ...prev, third: !prev.third }))
          }
        />
      </g>
      <g transform="translate(10, 10)">
        <polygon
          points="20 0 20 20 0 20"
          fill="white"
          stroke="black"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Test;
