import { PlacementQuizType } from "@/lib/quizParser";
import { IQuizProp } from "./QuizRenderer";
import { QuizActions, QuizLayout } from "./components";
import { Button } from "../ui/button";
import { cn } from "@/utils/cn";
import ReactMarkdown from "@/lib/markdown";
import { useMemo, useState } from "react";

const PlacementQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const quizBlock = quiz.quizBlock as PlacementQuizType;
  const [userAnswer, setUserAnswer] = useState<{ value: string }[]>(
    quizBlock.options.map(() => ({ value: "" }))
  );
  const [options, setOptions] = useState<typeof quizBlock.options>(
    quizBlock.options
  );

  const emptyBlankIndex = useMemo(
    () => userAnswer.findIndex((b) => b.value === ""),
    [userAnswer]
  );
  const isSomeBlanksEmpty = emptyBlankIndex !== -1;

  const handleCheckAnswer = () => {
    if (isSomeBlanksEmpty) return;

    console.log(userAnswer, quizBlock.zones);
    setIsCorrect(userAnswer.every((v, i) => quizBlock.zones[i] === v.value));
  };

  const handleOptionClick = (zone: string) => {
    if (!isActive || !isSomeBlanksEmpty) return;

    setOptions((prev) =>
      prev.map((v) => (v.zone != zone ? v : { zone: "", content: "" }))
    );
    setUserAnswer((prev) => {
      const next = [...prev];
      next[emptyBlankIndex] = { value: zone };
      return next;
    });
  };

  const handleZoneClick = (blankIndex: number) => {
    const option = quizBlock.options.find(
      (o) => o.zone === userAnswer[blankIndex].value
    );
    if (!isActive || !option) return;

    setUserAnswer((prev) => {
      const next = [...prev];
      next[blankIndex] = { value: "" };
      return next;
    });
    setOptions((prev) => {
      const emptySlotIndex = prev.findIndex((v) => v.zone === "");
      const next = [...prev];
      next[emptySlotIndex] = option;
      return next;
    });
  };

  return (
    <>
      <QuizLayout content={quiz.content}>
        <div className="flex gap-2 sm:gap-4 w-full justify-evenly">
          {quizBlock.zones.map((zone, index) => (
            <span
              key={index}
              className={cn(
                "flex-1 border border-dashed rounded-xl flex justify-center items-center aspect-3/4",
                userAnswer[index].value && "border-2 border-solid"
              )}
              onClick={() => handleZoneClick(index)}
            >
              {userAnswer[index].value
                ? quizBlock.options.find(
                    (o) => o.zone === userAnswer[index].value
                  )!.content
                : zone}
            </span>
          ))}
        </div>
        <div className="flex gap-2 sm:gap-4 w-full justify-evenly mt-10">
          {Array.from({ length: quizBlock.options.length }, (_, index) => (
            <div key={index} className="flex-1 aspect-3/4">
              {options[index].zone && (
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full flex justify-center items-center aspect-3/4",
                    "border rounded-xl p-0 **:text-wrap text-center",
                    !isActive && "pointer-events-none"
                  )}
                  onClick={() => handleOptionClick(options[index].zone)}
                >
                  <ReactMarkdown>{options[index].content}</ReactMarkdown>
                </Button>
              )}
            </div>
          ))}
        </div>
        {isCorrect !== null && <p>{!isCorrect ? "😩 Incorrect" : ""}</p>}
      </QuizLayout>
      {isActive && !isCorrect && (
        <QuizActions disabled={isSomeBlanksEmpty} onCheck={handleCheckAnswer} />
      )}
    </>
  );
};

export default PlacementQuiz;
