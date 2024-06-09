import { Step } from "@/lib/types";
import Image from "next/image";

const steps: Step[] = [
  {
    title: 'Understanding Variables',
    answer: undefined,
    content: (
      { setAnswer }: { setAnswer: (answer: number | undefined) => void }
    ) => 
      <>
        <Image src="/app/contents/computer-science/beginners-python-programming/bookend-JGNY9Y.png" width={270} height={270} />
        <h2>Understanding Variables</h2>
        <p>In this course, we'll learn how to solve equations and apply them to real situations. Before we can write and solve equations, let's investigate <b>variables</b> — placeholders for unknown quantities.</p>
      </>
  },
  {
    title: 'Step 2',
    answer: undefined,
    content: (
      { setAnswer }: { setAnswer: (answer: number | undefined) => void }
    ) => 
      <>
        <p>The scale shows the weight of the items in kilograms (kg).</p>
        <Image src="/app/contents/computer-science/beginners-python-programming/bookend-JGEC3W.png" width={270} height={270} />
        <div className="quiz-solvable">
          <p>What's the weight of one square?</p>
          <input type="number" onChange={(e) => setAnswer(e.target.valueAsNumber)} /> kg
        </div>
      </>
  }, 
  {
    title: 'Step 3',
    answer: 9,
    content: (
      { setAnswer }: { setAnswer: (answer: number | undefined) => void }
    ) => 
      <>
        <Image src="/app/contents/computer-science/beginners-python-programming/bookend-2KRMW4.png" width={270} height={270} />
        <h2>Step 3</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
        <p>What's the weight of one triangle?</p>
        3 * 3 = <input type="number" onChange={(e) => setAnswer(e.target.valueAsNumber)} />
      </>
  }
];

export default steps;