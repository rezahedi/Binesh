import { Part } from "@/lib/types";

const parts: Part[] = [
  {
    title: 'Understanding Python',
    steps: [
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
            2 + 2 = <input type="number" className="rounded-md w-20 border-2 border-green-500 mx-2 p-2" autoFocus onChange={(e) => setAnswer(e.target.valueAsNumber)} /> 
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
            3 * 3 = <input type="number" className="rounded-md w-20 border-2 border-green-500 mx-2 p-2" autoFocus onChange={(e) => setAnswer(e.target.valueAsNumber)} />
          </>
      }
    ]
  },
  {
    title: 'Variables and Data Types',
    steps: [
      {
        title: 'Step 1 from Part 2',
        answer: undefined,
        content: (
          { setAnswer }: { setAnswer: (answer: number | undefined) => void }
        ) => 
          <>
            <h2>Step 2 from part 2</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
          </>
      },
      {
        title: 'Step 2 from Part 2',
        answer: undefined,
        content: (
          { setAnswer }: { setAnswer: (answer: number | undefined) => void }
        ) => 
          <>
            <h2>Step 2 from part 2</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
          </>
      }
    ]
  }
];

export default parts;