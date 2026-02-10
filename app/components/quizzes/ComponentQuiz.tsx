import { ComponentQuizType } from "@/lib/quizParser";
import { IQuizProp } from "@/components/quizzes/QuizRenderer";
import { ComponentRenderer } from "@/components/Interactive/ComponentRenderer";
import { QuizLayout, QuizActions } from "./components";
import { useQuiz } from "@/contexts/QuizContext";

const ComponentQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  // const [userAnswer, setUserAnswer] = useState<unknown | null>(null);
  const { userAnswer, setUserAnswer, revealResult, setRevealResult } =
    useQuiz();

  const quizBlock = quiz.quizBlock as ComponentQuizType;

  // TODO: Should find a way to make answer check generic as different component quiz types need different check answer as user's input could be in variety of value types
  // But now it's only string!

  const handleChange = (str: string) => {
    if (!isActive) return;

    setIsCorrect(null);
    setRevealResult(null);
    setUserAnswer(str);
  };

  const handleCheckAnswer = () => {
    if (userAnswer === null) return;

    setIsCorrect(userAnswer === quizBlock.answer);
    setRevealResult(true);
  };

  const handleResetAnswer = () => {
    setUserAnswer(null);
    setRevealResult(null);
    setIsCorrect(null);
  };

  return (
    <>
      <QuizLayout>
        <ComponentRenderer
          component={quizBlock.componentName}
          props={{
            onChange: handleChange,
            isActive,
            props: quizBlock.props,
          }}
        />
        {isCorrect === false && <p>😩 Incorrect</p>}
      </QuizLayout>
      {isActive && !isCorrect && (
        <QuizActions
          disabled={userAnswer === null}
          onCheck={handleCheckAnswer}
          onReset={revealResult ? handleResetAnswer : undefined}
        />
      )}
    </>
  );
};

export default ComponentQuiz;
