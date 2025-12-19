import { useState } from "react";
import { BlockMath } from "@/lib/react-katex";
import SquareFraction from "@/components/Interactive/Blocks/SquareFraction";

/**
 * Interactive Components are self-contained standalone components that are for user's to play with inputs and see the output result
 * So don't have any interaction with other components.
 * Accept NO props or callbacks
 * BUT if props added in markdown, as component props beside component name it will pass to component.
 * Example use in markdown: <component name="component name" prop1="xyz" prop2="123" />
 * Then this component could have props and use above values.
 */
const Fraction = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <>
      <SquareFraction total={3} onChange={setSelected} />
      {selected === 0 && <BlockMath math="x=0" className="text-4xl" />}
      {selected === 1 && (
        <BlockMath math="x=\frac{1}{3}" className="text-4xl" />
      )}
      {selected === 2 && (
        <BlockMath math="x=\frac{2}{3}" className="text-4xl" />
      )}
      {selected === 3 && (
        <BlockMath math="x=\frac{3}{3}=1" className="text-4xl" />
      )}
    </>
  );
};

export default Fraction;
