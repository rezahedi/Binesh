import { useState } from "react";
import BetweenButton from "./BetweenButton";

interface TextareaBlockProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextareaBlock = ({ id, label, value, ...props }: TextareaBlockProps) => {
  const [isVisible, setIsVisible] = useState(value ? true : false);

  if (!isVisible) {
    return <BetweenButton onClick={() => setIsVisible(true)} />;
  }

  return (
    <div className="group/step relative">
      <label
        htmlFor={`step-content-${id}`}
        className="opacity-0 group-hover/step:opacity-100 absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted"
      >
        {label}
      </label>
      <textarea
        id={`step-content-${id}`}
        value={value}
        {...props}
        autoFocus
        className="w-full p-1 field-sizing-content bg-transparent border-none hover:bg-muted resize-none min-h-14 ring-0 outline-none focus:bg-muted"
      />
    </div>
  );
};

export default TextareaBlock;
