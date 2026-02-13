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

  // TODO: Let the user know if the answer is partially correct

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    const inputValue = e.target.value;
    if (isCorrect === false) {
      setIsCorrect(null);
      setRevealResult(false);
      return setUserAnswers([inputValue]);
    }

    if (e.target.checked) setUserAnswers([...userAnswers, inputValue]);
    else setUserAnswers(userAnswers.filter((val) => val !== inputValue));
  };

  const handleCheckAnswer = () => {
    if (userAnswers.length === 0) return;

    if (userAnswers.length !== quizBlock.answers.length) {
      setIsCorrect(false);
      setRevealResult(false);
      return;
    }

    const result = userAnswers.every((a) => quizBlock.answers.includes(a));
    setIsCorrect(result);
    setRevealResult(true);
  };

  const handleResetAnswer = () => {
    setUserAnswers([]);
    setRevealResult(false);
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
