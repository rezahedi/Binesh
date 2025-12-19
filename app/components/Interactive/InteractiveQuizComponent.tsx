import { useState } from "react";
import SquareFraction from "@/components/Interactive/Blocks/SquareFraction";

/**
 * Accept a callback function to trigger whenever user interact with the component, select/deselect, type and etc.
 * And pass the unknown argument (it could be string, number, array, object, depends on quiz type)
 * Should pass null if user changed its answer to the initial value, pass null just to disable "Check" button
 * Both onAnswer and isActive are optional.
 */
// TODO: add another prop isActive to freeze quiz component interactivity
const InteractiveQuizComponent = ({
  onAnswer,
  isActive = true,
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

  return <SquareFraction total={3} onChange={onAnswer} isActive={isActive} />;
};

export default InteractiveQuizComponent;
