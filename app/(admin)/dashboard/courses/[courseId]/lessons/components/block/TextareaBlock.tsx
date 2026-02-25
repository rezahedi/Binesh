import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface TextareaBlockProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextareaBlock = ({ id, label, value, ...props }: TextareaBlockProps) => {
  const [isVisible, setIsVisible] = useState(value ? true : false);

  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={() => setIsVisible(true)}
        className="group/between block w-full border border-transparent cursor-pointer"
      >
        <div className="flex justify-center border border-transparent h-0 w-1/3 mx-auto my-4 group-hover/between:w-full rounded transition-all duration-150 group-hover/between:border-muted-foreground">
          <div className="-translate-y-1/2 bg-transparent border border-muted size-8 rounded-full flex items-center justify-center text-muted-foreground group-hover/between:bg-muted-foreground group-hover/between:border-muted-foreground group-hover/between:text-foreground">
            <PlusIcon className="h-4 w-4" />
          </div>
        </div>
      </button>
    );
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
