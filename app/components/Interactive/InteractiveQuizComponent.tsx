import { useState } from "react";
import SquareFraction from "@/components/Interactive/Blocks/SquareFraction";
import { InteractiveComponentProps } from ".";

/**
 * Accept a callback function to trigger whenever user interact with the component, select/deselect, type and etc.
 * And pass the unknown argument (it could be string, number, array, object, depends on quiz type)
 * Should pass null if user changed its answer to the initial value, pass null just to disable "Check" button
 * Both onAnswer and isActive are optional.
 */
// TODO: add another prop isActive to freeze quiz component interactivity
const InteractiveQuizComponent = ({
  onChange,
  isActive = true,
}: InteractiveComponentProps) => {
  const handleChange = (num: number) => {
    if (onChange) onChange(String(num));
  };

  return (
    <SquareFraction total={3} onChange={handleChange} isActive={isActive} />
  );
};

export default InteractiveQuizComponent;
