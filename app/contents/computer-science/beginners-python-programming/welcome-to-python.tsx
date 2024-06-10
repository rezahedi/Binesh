import { Part, Step } from "@/lib/types";

const parts: Part[] = [
  {
    title: 'Understanding Python',
    steps: 3
  },
  {
    title: 'Variables and Data Types',
    steps: 2
  }
];
export { parts };

const steps: Step[] = [
  {
    title: 'Step 1',
    answer: 4,
    content: (
      { setAnswer }: { setAnswer: (answer: number | undefined) => void }
    ) => 
      <>
        <h2>Step 1</h2>
        <p>Lorem ipsum <b>dolor sit</b> amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
        <p>What is the result of equation of 2 + 2 ?</p>
        2 + 2 = <input type="number" onChange={(e) => setAnswer(e.target.valueAsNumber)} />
      </>
  },
  {
    title: 'Step 2',
    answer: undefined,
    content: (
      { setAnswer }: { setAnswer: (answer: number | undefined) => void }
    ) => 
      <>
        <h2>Step 2</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
      </>
  }, 
  {
    title: 'Step 3',
    answer: 9,
    content: (
      { setAnswer }: { setAnswer: (answer: number | undefined) => void }
    ) => 
      <>
        <h2>Step 3</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
        <p>What is the result of equation of 3 * 3 ?</p>
        3 * 3 = <input type="number" onChange={(e) => setAnswer(e.target.valueAsNumber)} />
      </>
  }
];

export default steps;