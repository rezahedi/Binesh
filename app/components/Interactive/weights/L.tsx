import { InteractiveComponentProps } from "..";
import LeverScale from "./LeverScale";
import { useQuiz } from "@/contexts/QuizContext";

const L = ({ onChange, isActive, props }: InteractiveComponentProps) => {
  console.log("props:", props);

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
        {...(props && JSON.parse(props))}
        // masses={[
        //   [userAnswer ? Number(userAnswer) : -1, -1],
        //   [10, 2],
        // ]}
        // rodLength={7}
        // fulcrum={3}
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

export default L;
