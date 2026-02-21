import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const BetweenButton = ({
  index,
  onAddStepAfter,
}: {
  index: number;
  onAddStepAfter: (index: number) => void;
}) => {
  return (
    <div className="flex justify-center">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onAddStepAfter(index)}
      >
        <PlusIcon className="h-4 w-4" />
        Add Step Here
      </Button>
    </div>
  );
};

export default BetweenButton;
