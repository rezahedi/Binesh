import { useState } from "react";
import { InteractiveComponentProps } from "..";
import LeverScale, { LeverScaleProps } from "./LeverScale";
import { useQuiz } from "@/contexts/QuizContext";

const L = ({
  onChange,
  isActive = true,
  props: propsString,
}: InteractiveComponentProps) => {
  const props: LeverScaleProps = propsString ? JSON.parse(propsString) : {};
  const [masses, setMasses] = useState(props.masses || []);

  const { userAnswer, revealResult } = useQuiz();

  const draggableWeightIndex: number | undefined =
    props.draggableWeightIndex !== undefined && userAnswer !== ""
      ? Number(userAnswer)
      : props.draggableWeightIndex;

  return (
    <div>
      <LeverScale
        {...props}
        masses={replaceUndefined(masses, Number(userAnswer))}
        draggableWeightIndex={draggableWeightIndex}
        showResult={revealResult !== null ? true : false}
        isActive={isActive}
      />
    </div>
  );
};

const replaceUndefined = (
  masses: [number, number][],
  weight: number | null
): [number, number][] => {
  if (weight === null) return masses;

  return masses.map((m) => [m[0] === -1 ? weight : m[0], m[1]]);
};

export default L;
