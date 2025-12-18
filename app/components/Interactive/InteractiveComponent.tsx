import { cn } from "@/utils/cn";
import { useState } from "react";
import { BlockMath } from "@/lib/react-katex";

/**
 * Interactive Components are self-contained standalone components that are for user's to play with inputs and see the output result
 * So don't have any interaction with other components.
 * Accept NO props or callbacks
 * BUT if props added in markdown, as component props beside component name it will pass to component.
 * Example use in markdown: <component name="component name" prop1="xyz" prop2="123" />
 * Then this component could have props and use above values.
 */
const InteractiveComponent = () => {
  const [selected, setSelected] = useState<boolean[] | null>(null);
  const selectedCount =
    selected?.reduce((accu, curr) => accu + (curr ? 1 : 0), 0) || 0;

  const handleSelect = (index: number) => {
    const newSelected = [...(selected || [false, false, false])];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
  };

  return (
    <>
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
              selected && selected[0] && "fill-amber-200"
            )}
            onClick={() => handleSelect(0)}
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
              selected && selected[1] && "fill-amber-200"
            )}
            onClick={() => handleSelect(1)}
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
              selected && selected[2] && "fill-amber-200"
            )}
            onClick={() => handleSelect(2)}
          />
        </g>
      </svg>
      <p>Interact with above component and see the result below: </p>
      {selectedCount === 0 && <BlockMath math="x=0" className="text-4xl" />}
      {selectedCount === 1 && (
        <BlockMath math="x=\frac{1}{3}" className="text-4xl" />
      )}
      {selectedCount === 2 && (
        <BlockMath math="x=\frac{2}{3}" className="text-4xl" />
      )}
      {selectedCount === 3 && (
        <BlockMath math="x=\frac{3}{3}=1" className="text-4xl" />
      )}
    </>
  );
};

export default InteractiveComponent;
