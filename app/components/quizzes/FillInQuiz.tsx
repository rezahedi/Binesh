import { FillQuizType } from "@/lib/quizParser";
import { cn } from "@/utils/cn";
import { IQuizProp } from "@/components/quizzes/QuizRenderer";
import { QuizLayout, QuizActions } from "./components";
import { useQuiz } from "@/contexts/QuizContext";

const FillInQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const { userAnswer, setUserAnswer, setRevealResult } = useQuiz();
  const quizBlock = quiz.quizBlock as FillQuizType;
  const [pre, suf] = quizBlock.content.split("[ ]");
  const hasBlank = suf !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    setIsCorrect(null);
    setRevealResult(false);
    setUserAnswer(e.target.value);
  };

  const handleCheckAnswer = () => {
    if (userAnswer === null) return;

    setIsCorrect(userAnswer.toLowerCase() === quizBlock.answer.toLowerCase());
    setRevealResult(true);
  };

  return (
    <>
      <QuizLayout content={quiz.content}>
        {pre}
        {hasBlank && (
          <input
            className={cn(
              `rounded-xl p-2 px-3 text-center font-medium border-2 border-border hover:border-quiz-select hover:bg-quiz-select-light field-sizing-content max-w-2xs transition-all duration-100`,
              isCorrect !== null
                ? isCorrect === true
                  ? `border-quiz-success bg-quiz-success-light text-quiz-success-dark`
                  : `border-quiz-error bg-quiz-error-light text-quiz-error-dark`
                : ``,
              !isActive && `pointer-events-none`
            )}
            id={quiz.id}
            name={quiz.id}
            type="string"
            size={quizBlock.answer.length}
            style={{
              minWidth: `${quizBlock.answer.length}em`,
            }}
            defaultValue={userAnswer || ""}
            onChange={handleChange}
            readOnly={!isActive}
          />
        )}
        {suf}
      </QuizLayout>
      {isActive && !isCorrect && (
        <QuizActions
          disabled={userAnswer === null}
          onCheck={handleCheckAnswer}
        />
      )}
    </>
  );
};

export default FillInQuiz;
