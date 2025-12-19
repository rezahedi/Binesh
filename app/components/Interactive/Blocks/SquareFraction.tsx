import { cn } from "@/utils/cn";
import { useState } from "react";

const SQUARE_WIDTH = 100;
const PADDING = 11;
const SPACE_WIDTH = SQUARE_WIDTH - 2 * PADDING;

const SquareFraction = ({
  total,
  onChange,
  isActive = true,
}: {
  total: number;
  onChange?: (value: number) => void;
  isActive?: boolean;
}) => {
  const [rows, columns] = closestFactors(total);
  const [selected, setSelected] = useState<boolean[] | null>(null);

  const handleSelect = (index: number) => {
    const newSelected = [...(selected || Array(total).fill(false))];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);

    if (onChange) {
      const selectedCount =
        newSelected?.reduce((accu, curr) => accu + (curr ? 1 : 0), 0) || 0;
      onChange(selectedCount);
    }
  };

  return (
    <svg
      viewBox={`0, 0, ${SQUARE_WIDTH}, ${SQUARE_WIDTH}`}
      xmlns="http://www.w3.org/2000/svg"
      className="aspect-10/8 sm:aspect-14/10"
    >
      <g transform={`translate(${PADDING}, ${PADDING})`}>
        <rect
          x="0"
          y="0"
          width={SPACE_WIDTH}
          height={SPACE_WIDTH}
          strokeWidth={2}
          className="fill-background stroke-foreground"
          strokeLinejoin="round"
        />
        {Array.from({ length: columns }, (_, i) => (
          <g key={i}>
            {Array.from({ length: rows }, (_, j) => (
              <rect
                key={rows * i + j}
                x={i * (SPACE_WIDTH / columns)}
                y={j * (SPACE_WIDTH / rows)}
                width={SPACE_WIDTH / columns}
                height={SPACE_WIDTH / rows}
                strokeWidth={1}
                className={cn(
                  "fill-background stroke-foreground cursor-pointer hover:fill-amber-100",
                  selected && selected[rows * i + j] && "fill-amber-200",
                  !isActive && "pointer-events-none"
                )}
                onClick={() => handleSelect(rows * i + j)}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
};

export default SquareFraction;

function closestFactors(n: number): [number, number] {
  for (let i = Math.floor(Math.sqrt(n)); i >= 1; i--) {
    if (n % i === 0) {
      return [i, n / i];
    }
  }
  return [1, n];
}
