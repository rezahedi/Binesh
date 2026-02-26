import { CheckListQuizType, RadioQuizType } from "@/lib/quizParser";
import { parseLessonDocument } from "../app/lib/quizParser";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "sample-lesson-format.md");

console.log(`Reading file: ${filePath}`);
const content = fs.readFileSync(filePath, "utf8");

try {
  const { steps } = parseLessonDocument(content);
  console.log(`Successfully parsed ${steps.length} steps.`);

  steps.forEach((step, index) => {
    console.log(`\nStep ${index + 1}: ${step.title}`);
    if (step.quiz) {
      console.log(`  Quiz Type: ${step.quiz.type}`);
      // Log specific fields to ensure JSON parsed correctly
      if (step.quiz.type === "radio") {
        console.log(
          `  Options: ${(step.quiz.quizBlock as RadioQuizType).options.join(", ")}`
        );
        console.log(
          `  Answer: ${(step.quiz.quizBlock as RadioQuizType).answer}`
        );
      } else if (step.quiz.type === "checkList") {
        console.log(
          `  Correct Answers: ${(step.quiz.quizBlock as CheckListQuizType).answers.join(", ")}`
        );
      }
    } else {
      console.log("  (No quiz)");
    }
  });
} catch (error) {
  console.error("Error parsing lesson:", error);
  process.exit(1);
}
