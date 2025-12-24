import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { cn } from "@/utils/cn";
import { XIcon } from "lucide-react";

function ResponsivePopover({
  title,
  button,
  children,
}: {
  title: string;
  button: ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isMobile } = useMediaQuery();

  if (isMobile)
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{button}</SheetTrigger>
        <SheetContent
          side={"bottom"}
          className={cn(
            "rounded-t-2xl border border-b-0 bg-popover text-popover-foreground shadow-md outline-none",
            "w-full flex flex-col gap-5 bg-background shadow-xl p-6 pb-10",
            "[&>button:last-of-type]:hidden"
          )}
        >
          <SheetHeader className="h-8">
            <SheetClose className="absolute top-4 right-4 cursor-pointer p-2 hover:bg-foreground/15 rounded-full">
              <XIcon />
            </SheetClose>
          </SheetHeader>
          <SheetTitle className="sr-only">{title}</SheetTitle>
          {children}
        </SheetContent>
      </Sheet>
    );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{button}</PopoverTrigger>
      <PopoverContent className="w-fit flex flex-col gap-5 bg-background shadow-xl py-6 px-8 sm:max-w-sm">
        {children}
      </PopoverContent>
    </Popover>
  );
}

export default ResponsivePopover;
