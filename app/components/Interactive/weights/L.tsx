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

  return (
    <div>
      <LeverScale
        {...props}
        masses={replaceUndefined(
          masses,
          userAnswer ? Number(userAnswer) : null,
          props.draggableWeightIndex !== undefined
            ? props.draggableWeightIndex
            : null
        )}
        showResult={revealResult !== null ? true : false}
        isActive={isActive}
      />
    </div>
  );
};

const replaceUndefined = (
  masses: [number, number][],
  value: number | null,
  index: number | null
): [number, number][] => {
  if (value === null) return masses;

  if (index === null)
    return masses.map((m) => [m[0] === -1 ? value : m[0], m[1]]);

  return masses.map((m, i) => [m[0], i === index ? value : m[1]]);
};

export default L;
