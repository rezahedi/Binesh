import {useState} from "react";
import {cn} from "@/utils/cn";
import {SectionType} from "@/lib/quizParser";
import QuizRenderer from "./quizzes/QuizRenderer";
import Markdown from "react-markdown";
import Img from "./markdown/Img";

export default function ShowStep({step}: {step: SectionType}) {
  return (
    <div className="min-h-fit pt-8 pb-12">
      <Markdown components={{img: Img}}>{step.content}</Markdown>
      <Markdown components={{img: Img}}></Markdown>
      <p>{step.quiz?.type}</p>
      {step.quiz && <QuizRenderer quiz={step.quiz} />}
    </div>
  );
}
