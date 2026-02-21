import QuizRenderer from "@/components/quizzes/QuizRenderer";
import { SectionType } from "@/lib/quizParser";
import { useState } from "react";

const Quiz = ({ step }: { step: SectionType }) => {
  const [quizResult, setQuizResult] = useState<boolean | null>(null);

  if (!step.quiz) return null;

  return (
    <div key={`${step.id}-preview`}>
      <QuizRenderer
        quiz={{
          ...step.quiz,
          id: `${step.id}-preview-quiz`,
        }}
        isActive={true}
        quizResult={quizResult}
        onCheck={setQuizResult}
      />
    </div>
  );
};

export default Quiz;
