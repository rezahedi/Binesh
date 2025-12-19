import { cn } from "@/utils/cn";
import { useState } from "react";

const SQUARE_WIDTH = 100;
const PADDING = 11;
const SPACE_WIDTH = SQUARE_WIDTH - 2 * PADDING;

const SquareFractionGrid = ({
  pairPoints,
  onChange,
  isActive = true,
}: {
  pairPoints: { coordinate: [number, number]; points: [number, number][] };
  onChange?: (value: number) => void;
  isActive?: boolean;
}) => {
  const [selected, setSelected] = useState<boolean[] | null>(null);
  const [rows, columns] = pairPoints.coordinate;
  const widthUnit = SPACE_WIDTH / columns;
  const heightUnit = SPACE_WIDTH / rows;

  const handleSelect = (index: number) => {
    const newSelected = [
      ...(selected || Array(pairPoints.points.length).fill(false)),
    ];
    newSelected[index] = !newSelected[index];
    console.log(newSelected);
    setSelected(newSelected);

    if (onChange) {
      const selectedCount =
        newSelected.reduce((accu, curr, i) => {
          if (pairPoints.points[i][0] === 0 || !curr) return accu;
          return accu + pairPoints.points[i][0] * pairPoints.points[i][1];
        }, 0) || 0;
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
        {Array.from({ length: rows }, (_, y) => (
          <g key={y}>
            {Array.from({ length: columns }, (_, x) => (
              <>
                {pairPoints.points[columns * y + x][0] !== 0 && (
                  <rect
                    key={columns * y + x}
                    x={x * widthUnit}
                    y={y * heightUnit}
                    width={pairPoints.points[columns * y + x][0] * widthUnit}
                    height={pairPoints.points[columns * y + x][1] * heightUnit}
                    strokeWidth={1}
                    className={cn(
                      "fill-background stroke-foreground cursor-pointer hover:fill-amber-100",
                      selected && selected[columns * y + x] && "fill-amber-200",
                      !isActive && "pointer-events-none"
                    )}
                    onClick={() => handleSelect(columns * y + x)}
                  />
                )}
              </>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
};

export default SquareFractionGrid;
