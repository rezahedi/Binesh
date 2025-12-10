import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { DialogClose } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, useState } from "react";

interface ICancelLessonButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  redirectUrl: string;
}

const CancelLessonButton = (props: ICancelLessonButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.push(props.redirectUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={"icon"}
          className={cn("shadow-none hover:bg-muted", props.className)}
          {...props}
        >
          <XIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader className="items-center gap-4">
          <DialogTitle className="text-xl">Are you sure?</DialogTitle>
          If you quit now, you will lose your progress and XP.
        </DialogHeader>
        <DialogFooter className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            className="font-semibold text-destructive"
          >
            Quit
          </Button>
          <DialogClose asChild>
            <Button type="button" autoFocus variant="default">
              Keep learning
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelLessonButton;
