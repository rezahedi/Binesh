import { cn } from "@/utils/cn";
import { useState } from "react";
/**
 * Accept a callback function to trigger whenever user interact with the component, select/deselect, type and etc.
 * And pass the unknown argument (it could be string, number, array, object, depends on quiz type)
 * Should pass null if user changed its answer to the initial value, pass null just to disable "Check" button
 * Both onAnswer and isActive are optional.
 */
// TODO: add another prop isActive to freeze quiz component interactivity
const InteractiveQuizComponent = ({
  onAnswer,
  isActive = false,
}: {
  onAnswer?: (answer: unknown) => void | null;
  isActive?: boolean;
}) => {
  // Store user's input state, it could be selecting, typing, changing values or anything
  const [selected, setSelected] = useState<boolean[] | null>(null);

  // User's event handler
  const handleSelect = (index: number) => {
    // Update state
    const newSelected = [...(selected || [false, false, false])];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);

    // Trigger callback to send up user's answer value
    if (onAnswer) {
      const userAnswer =
        newSelected.reduce((accu, curr) => accu + (curr ? 1 : 0), 0) || null;
      onAnswer(userAnswer);
    }
  };

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
            selected && selected[0] && "fill-amber-200",
            !isActive && "pointer-events-none"
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
            selected && selected[1] && "fill-amber-200",
            !isActive && "pointer-events-none"
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
            selected && selected[2] && "fill-amber-200",
            !isActive && "pointer-events-none"
          )}
          onClick={() => handleSelect(2)}
        />
      </g>
    </svg>
  );
};

export default InteractiveQuizComponent;
