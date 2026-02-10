import { CheckListQuizType } from "@/lib/quizParser";
import { cn } from "@/utils/cn";
import { IQuizProp } from "@/components/quizzes/QuizRenderer";
import { QuizLayout, QuizActions } from "./components";
import ReactMarkdown from "@/lib/markdown";
import { getAnswerFeedbackClasses } from "./utils";
import { useQuiz } from "@/contexts/QuizContext";

const CheckListQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const { userAnswers, setUserAnswers, setRevealResult } = useQuiz();
  const quizBlock = quiz.quizBlock as CheckListQuizType;

  // TODO: Switch from storing indexes in quiz.quizBlock to storing actual answers values by changing quiz markdown format and parser logic
  // Them remove this mapping
  const quizAnswers = quizBlock.options.filter((_, index) =>
    quizBlock.answer.includes(index)
  );

  // TODO: Let the user know if the answer is partially correct

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    const inputValue = e.target.value;
    if (isCorrect === false) {
      setIsCorrect(null);
      setRevealResult(null);
      return setUserAnswers([inputValue]);
    }

    if (e.target.checked) setUserAnswers([...userAnswers, inputValue]);
    else setUserAnswers(userAnswers.filter((val) => val !== inputValue));
  };

  const handleCheckAnswer = () => {
    if (userAnswers.length === 0) return;

    if (userAnswers.length !== quizAnswers.length) {
      setIsCorrect(false);
      setRevealResult(null);
      return;
    }

    const result = userAnswers.every((a) => quizAnswers.includes(a));
    setIsCorrect(result);
    setRevealResult(result);
  };

  const handleResetAnswer = () => {
    setUserAnswers([]);
    setRevealResult(null);
    setIsCorrect(null);
  };

  return (
    <>
      <QuizLayout content={quiz.content}>
        <div
          className={cn(
            `grid gap-3 mt-4 [&_figure]:p-0 has-[.katex]:text-2xl`,
            quizBlock.options.length < 4
              ? `grid-cols-1 [&_img]:h-36`
              : `grid-cols-2`,
            !isActive && `pointer-events-none`
          )}
        >
          {quizBlock.options.map((option, index) => (
            <label
              htmlFor={`${quiz.id}-${index}`}
              key={index}
              tabIndex={0}
              className={cn(
                `rounded-xl p-4 px-6 cursor-pointer text-center font-medium border-2 border-border`,
                `hover:border-quiz-select hover:bg-quiz-select-light`,
                `has-checked:border-quiz-select-dark has-checked:bg-quiz-select-light has-checked:text-quiz-select-dark transition-all duration-100`,
                getAnswerFeedbackClasses(isCorrect)
              )}
            >
              <input
                id={`${quiz.id}-${index}`}
                type="checkbox"
                name={quiz.id}
                value={option}
                checked={userAnswers.includes(option)}
                onChange={handleChange}
                readOnly={!isActive}
                className="hidden"
              />
              <ReactMarkdown>{option}</ReactMarkdown>
            </label>
          ))}
        </div>
      </QuizLayout>
      {isActive && !isCorrect && (
        <QuizActions
          disabled={userAnswers.length === 0}
          onCheck={handleCheckAnswer}
          onReset={userAnswers.length ? handleResetAnswer : undefined}
        />
      )}
    </>
  );
};

export default CheckListQuiz;
