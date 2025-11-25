import {useState} from "react";
import {cn} from "@/utils/cn";
import {SectionType} from "@/lib/quizParser";
import Quiz from "./Quiz";

export default function ShowStep({step}: {step: SectionType}) {
  return (
    <div className="min-h-fit pt-8 pb-12">
      <p>{step.content}</p>
      <p>{step.quiz?.content}</p>
      <p>{step.quiz?.type}</p>
      {step.quiz && <Quiz quiz={step.quiz} />}
    </div>
  );
}
