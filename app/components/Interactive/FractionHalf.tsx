import { InteractiveComponentProps } from "./types";
import SquareFractionGrid, {
  SquareFractionGridProps,
} from "./Blocks/SquareFractionGrid";

/**
 * Interactive Components are self-contained standalone components that are for user's to play with inputs and see the output result
 * So don't have any interaction with other components.
 * Accept NO props or callbacks
 * BUT if props added in markdown, as component props beside component name it will pass to component.
 * Example use in markdown: <component name="component name" prop1="xyz" prop2="123" />
 * Then this component could have props and use above values.
 */
const FractionHalf = ({
  onChange,
  isActive = true,
  ...props
}: InteractiveComponentProps) => {
  const handleChange = (num: number) => {
    if (onChange) onChange(String(num));
  };

  return (
    <SquareFractionGrid
      {...(props as SquareFractionGridProps)}
      onChange={handleChange}
      isActive={isActive}
    />
  );
};

export default FractionHalf;
