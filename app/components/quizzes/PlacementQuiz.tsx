import { PlacementQuizType } from "@/lib/quizParser";
import { IQuizProp } from "./QuizRenderer";
import { QuizActions, QuizLayout } from "./components";
import { buttonVariants } from "../ui/button";
import { cn } from "@/utils/cn";
import ReactMarkdown from "@/lib/markdown";

const PlacementQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const quizBlock = quiz.quizBlock as PlacementQuizType;

  return (
    <>
      <QuizLayout content={quiz.content}>
        <div className="flex gap-2 sm:gap-4 w-full justify-evenly">
          {quizBlock.zones.map((zone, index) => (
            <span
              key={index}
              className="flex-1 border border-dashed rounded-xl flex justify-center items-center aspect-3/4"
            >
              {zone}
            </span>
          ))}
        </div>
        <div className="flex gap-2 sm:gap-4 w-full justify-evenly mt-10">
          {quizBlock.options.map((option, index) => (
            <div
              key={index}
              draggable
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "flex justify-center items-center aspect-3/4",
                "flex-1 border rounded-xl p-0 **:text-wrap text-center",
                !isActive && "pointer-events-none"
              )}
            >
              <ReactMarkdown>{option}</ReactMarkdown>
            </div>
          ))}
        </div>
        {isCorrect !== null && <p>{!isCorrect ? "😩 Incorrect" : ""}</p>}
      </QuizLayout>
      {isActive && !isCorrect && (
        <QuizActions disabled={true} onCheck={() => {}} />
      )}
    </>
  );
};

export default PlacementQuiz;
