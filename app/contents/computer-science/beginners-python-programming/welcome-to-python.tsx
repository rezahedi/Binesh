import RadioList from "@/contents/components/RadioList";
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
            <h2 className="font-bold text-2xl py-2">How to plus two numbers?</h2>
            <p className="py-2">In Math, we can add two numbers together by using the plus sign (+). For example, 1 + 2 = 3.</p>
            <div className="bg-gray-200 p-2 rounded-md p-4 my-2">
              <p>What is the result of below equation?</p> 
              2 + 2 = <input type="number" className="rounded-md w-20 border-2 border-green-500 mx-2 p-2" autoFocus onChange={(e) => setAnswer(e.target.valueAsNumber)} /> 
            </div>
          </>
      },
      {
        title: 'Step 2',
        answer: 2,
        content: (
          { setAnswer }: { setAnswer: (answer: number | undefined) => void }
        ) => 
          <>
            <h2 className="font-bold text-2xl py-2">Step 2</h2>
            <p className="py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
            <div className="bg-gray-200 p-2 rounded-md p-4 my-2">
              <p>What's the total weight on the scale?</p> 
              <RadioList list={['c + c + c + c', '4c', '4 . c', 'All of the above']} />
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
            <h2 className="font-bold text-2xl py-2">How to multiply two numbers?</h2>
            <p className="py-2">In Math, we can multiply two numbers together by using the multiplication sign (×). For example, 2 × 3 = 6.</p>
            <div className="bg-gray-200 p-2 rounded-md p-4 my-2">
              <p>What is the result of below equation?</p> 
              3 × 3 = <input type="number" className="rounded-md w-20 border-2 border-green-500 mx-2 p-2" autoFocus onChange={(e) => setAnswer(e.target.valueAsNumber)} />
            </div>
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
            <h2 className="font-bold text-2xl py-2">Step 2 from part 2</h2>
            <p className="py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
          </>
      },
      {
        title: 'Step 2 from Part 2',
        answer: undefined,
        content: (
          { setAnswer }: { setAnswer: (answer: number | undefined) => void }
        ) => 
          <>
            <h2 className="font-bold text-2xl py-2">Step 2 from part 2</h2>
            <p className="py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
          </>
      }
    ]
  }
];

export default parts;