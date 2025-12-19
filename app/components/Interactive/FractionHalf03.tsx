import SquareFractionGrid from "./Blocks/SquareFractionGrid";

/**
 * Interactive Components are self-contained standalone components that are for user's to play with inputs and see the output result
 * So don't have any interaction with other components.
 * Accept NO props or callbacks
 * BUT if props added in markdown, as component props beside component name it will pass to component.
 * Example use in markdown: <component name="component name" prop1="xyz" prop2="123" />
 * Then this component could have props and use above values.
 */
const FractionHalf03 = ({
  onAnswer,
  isActive = true,
}: {
  onAnswer?: (answer: unknown) => void | null;
  isActive?: boolean;
}) => {
  return (
    <SquareFractionGrid
      pairPoints={{
        coordinate: [2, 4],
        points: [
          [1, 2],
          [1, 1],
          [1, 2],
          [1, 1],

          [0, 0],
          [1, 1],
          [0, 0],
          [1, 1],
        ],
      }}
      onChange={onAnswer}
      isActive={isActive}
    />
  );
};

export default FractionHalf03;
