import { useRef, HTMLAttributes } from "react";
import "mathlive";
import { MathfieldElement, MathfieldOptions } from "mathlive";

export interface IMathFieldProps {
  value: string;
  options?: Partial<MathfieldOptions>;
  onChange?: (value: string) => void;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

MathfieldElement.locale = "en";
MathfieldElement.decimalSeparator = ",";
MathfieldElement.keypressSound = "none";
MathfieldElement.plonkSound = "none";

export default function MathField(props: IMathFieldProps) {
  const mathField = useRef<MathfieldElement>(null);
  const onInput = () => props.onChange?.(mathField.current?.getValue() || "");
  const { options, style } = props;
  const divStyle = {
    ...style,
    width: "200px",
    fontSize: "1.5rem",
  };

  const init = (mf: MathfieldElement | null) => {
    if (mf) {
      mathField.current = mf;
    }
  };

  return (
    <math-field
      ref={init}
      onInput={onInput}
      options={options}
      style={divStyle}
    />
  );
}
