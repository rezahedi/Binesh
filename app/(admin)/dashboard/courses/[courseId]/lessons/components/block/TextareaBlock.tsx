import { useState } from "react";
import AddBlockButton from "./AddBlockButton";

interface TextareaBlockProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  visible?: boolean;
}

const TextareaBlock = ({
  id,
  label,
  value,
  visible = false,
  ...props
}: TextareaBlockProps) => {
  const [isVisible, setIsVisible] = useState(value ? true : visible);

  if (!isVisible) {
    return <AddBlockButton onClick={() => setIsVisible(true)} />;
  }

  return (
    <div className="relative">
      <textarea
        id={`step-content-${id}`}
        value={value}
        {...props}
        autoFocus
        className="peer w-full p-1 field-sizing-content bg-transparent border-none hover:bg-muted resize-none min-h-14 ring-0 outline-none focus:bg-muted"
      />
      <label
        htmlFor={`step-content-${id}`}
        className="pointer-events-none opacity-0 absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted peer-hover:opacity-100 peer-focus:opacity-100"
      >
        {label}
      </label>
    </div>
  );
};

export default TextareaBlock;
