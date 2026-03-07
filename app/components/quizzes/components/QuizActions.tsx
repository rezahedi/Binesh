import { Button } from "@/components/ui/button";
import { FlagIcon } from "lucide-react";

const QuizActions = ({
  disabled,
  onCheck,
  onReset,
}: {
  disabled: boolean;
  onCheck: () => void;
  onReset?: () => void;
}) => {
  return (
    <div className="flex gap-2 items-center sticky bottom-0 bg-background py-3">
      <div className="flex-1">
        <Button
          type="button"
          variant={"ghost"}
          className="text-muted-foreground"
          size={"sm"}
          disabled
        >
          <FlagIcon className="size-4" /> Report
        </Button>
      </div>
      {onReset && (
        <Button
          type="button"
          onClick={onReset}
          variant="ghost"
          className="font-semibold"
        >
          Reset
        </Button>
      )}
      <Button
        type="button"
        onClick={onCheck}
        disabled={disabled}
        className="font-semibold"
      >
        Check
      </Button>
    </div>
  );
};

export default QuizActions;
