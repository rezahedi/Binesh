import { PlusIcon } from "lucide-react";

const AddBlockButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/between block w-full border border-transparent cursor-pointer"
    >
      <div className="flex justify-center border border-transparent h-0 w-1/3 mx-auto my-4 group-hover/between:w-full rounded transition-all duration-150 group-hover/between:border-muted-foreground">
        <div className="-translate-y-1/2 bg-transparent border border-muted size-8 rounded-full flex items-center justify-center text-muted-foreground group-hover/between:bg-muted-foreground group-hover/between:border-muted-foreground group-hover/between:text-foreground">
          <PlusIcon className="h-4 w-4" />
        </div>
      </div>
    </button>
  );
};

export default AddBlockButton;
