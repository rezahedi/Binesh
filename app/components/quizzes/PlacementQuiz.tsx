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
        <div
          className={cn(
            "flex gap-2 sm:gap-4 w-full justify-evenly",
            !isActive && "pointer-events-none"
          )}
        >
          {quizBlock.zones.map((zone, index) => (
            <span
              key={index}
              className={cn(
                "flex-1 border border-dashed rounded-xl flex justify-center items-center",
                userAnswer[index].value && "border-transparent"
              )}
              style={{ aspectRatio: quizBlock.aspectRatio }}
              onClick={() => handleZoneClick(index)}
            >
              {userAnswer[index].value ? (
                <Button
                  variant={"outline"}
                  className="w-full h-full rounded-xl p-0"
                >
                  <ReactMarkdown>
                    {
                      quizBlock.options.find(
                        (o) => o.zone === userAnswer[index].value
                      )!.content
                    }
                  </ReactMarkdown>
                </Button>
              ) : (
                <span className="text-4xl sm:text-8xl font-bold text-muted">
                  {zone}
                </span>
              )}
            </span>
          ))}
        </div>
        <div className="flex gap-2 sm:gap-4 w-full justify-evenly mt-10">
          {Array.from({ length: quizBlock.options.length }, (_, index) => (
            <div
              key={index}
              className="flex-1 bg-muted/50 rounded-xl"
              style={{ aspectRatio: quizBlock.aspectRatio }}
            >
              {options[index].zone && (
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-full flex justify-center items-center",
                    "border rounded-xl p-0 **:text-wrap text-center"
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
