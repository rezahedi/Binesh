/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, HTMLAttributes } from "react";
import "mathlive";

export interface IMathFieldProps {
  value: string;
  // @ts-expect-error
  options?: Partial<MathfieldOptions>;
  onChange?: (value: string) => void;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

// @ts-expect-error
Object.assign(MathfieldElement, {
  locale: "en",
  decimalSeparator: ",",
  keypressSound: "none",
  plonkSound: "none",
});

export default function MathField(props: IMathFieldProps) {
  // @ts-expect-error
  const mathField = useRef<MathfieldElement>(null);
  const onInput = () => props.onChange?.(mathField.current?.getValue() || "");
  const { options, style } = props;
  const divStyle = {
    ...style,
    width: "200px",
    fontSize: "1.5rem",
  };

  // @ts-expect-error
  const init = (mf: MathfieldElement | null) => {
    if (mf) {
      mathField.current = mf;
    }
  };

  return (
    // @ts-expect-error
    <math-field
      ref={init}
      onInput={onInput}
      options={options}
      style={divStyle}
    />
  );
}
