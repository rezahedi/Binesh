import LeverScale from "./LeverScale";
import { useQuiz } from "@/contexts/QuizContext";

const L = () => {
  const { userAnswer, revealResult } = useQuiz();

  return (
    <LeverScale
      masses={[
        [userAnswer ? Number(userAnswer) : -1, -1],
        [10, 2],
      ]}
      rodLength={7}
      fulcrum={3}
      showResult={revealResult !== null ? true : false}
    />
  );
};

export default L;
