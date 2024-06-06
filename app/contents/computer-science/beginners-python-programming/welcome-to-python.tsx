const steps = [
  {
    title: 'Step 1',
    answer: 4,
    content: () => 
      <>
        <h2>Step 1</h2>
        <p>Lorem ipsum <b>dolor sit</b> amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
        <p>What is the result of equation of 2 + 2 ?</p>
        2 + 2 = <input type="number" />
      </>
  },
  {
    title: 'Step 2',
    answer: undefined,
    content: () => 
      <>
        <h2>Step 2</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
      </>
  }, 
  {
    title: 'Step 3',
    answer: 1,
    content: () => 
      <>
        <h2>Step 3</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum aperiam labore ab est commodi optio, dolores nihil! Iusto recusandae aspernatur adipisci libero enim corrupti ad sed alias deleniti laboriosam!</p>
        <p>What is the result of equation of 3 * 3 ?</p>
        1 * 1 = <input type="number" />
      </>
  }
];

export default steps;