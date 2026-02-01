import { InteractiveComponentProps } from "..";
import LeverScale, { LeverScaleProps } from "./LeverScale";
import { useQuiz } from "@/contexts/QuizContext";

const L = ({
  onChange,
  isActive,
  props: propsString,
}: InteractiveComponentProps) => {
  const props: LeverScaleProps = propsString ? JSON.parse(propsString) : {};

  const { userAnswer, revealResult } = useQuiz();

  const handleChangeCorrect = () => {
    console.log("C props", props);
    if (onChange) onChange("20");
  };

  const handleChangeWrong = () => {
    console.log("W props", props);
    if (onChange) onChange("10");
  };

  const handleChangeReset = () => {
    if (onChange) onChange("");
  };

  return (
    <div>
      <LeverScale
        {...props}
        masses={replaceUndefined(props.masses || [], Number(userAnswer))}
        showResult={revealResult !== null ? true : false}
      />
      <button onClick={handleChangeWrong} disabled={!isActive}>
        Change to wrong answer
      </button>
      <button onClick={handleChangeCorrect} disabled={!isActive}>
        Change to correct answer
      </button>
      <button onClick={handleChangeReset} disabled={!isActive}>
        Reset
      </button>
    </div>
  );
};

const replaceUndefined = (masses: number[][], weight: number | null) => {
  if (weight === null) return masses;

  return masses.map((m) => [m[0] === -1 ? weight : m[0], m[1]]);
};

export default L;
