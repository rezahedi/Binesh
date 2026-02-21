import { SectionType } from "@/lib/quizParser";
import StepCard from "./StepCard";
import { LaptopMinimalIcon, SmartphoneIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { MouseEvent, useState } from "react";

const MOBILE_WIDTH = 390;
const DESKTOP_WIDTH = 700;
const HEIGHT = 700;

const SidebarFrame = ({ step }: { step: SectionType | null }) => {
  const [isMobile, setIsMobile] = useState(true);

  const handleSwitchToMobile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMobile(true);
  };

  const handleSwitchToDesktop = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMobile(false);
  };

  return (
    <aside className="sticky top-4 shrink-0 space-y-4 bg-muted p-4">
      <div className="flex justify-center text-sm text-muted-foreground">
        <button
          className={cn(
            "flex gap-1 items-center p-1 px-3 border rounded-lg cursor-pointer hover:border-foreground/70 hover:text-foreground rounded-r-none",
            isMobile && "bg-muted-foreground text-foreground"
          )}
          onClick={handleSwitchToMobile}
        >
          <SmartphoneIcon className="size-4" />
          Mobile
        </button>
        <button
          className={cn(
            "flex gap-1 items-center p-1 px-3 border rounded-lg cursor-pointer hover:border-foreground/70 hover:text-foreground rounded-l-none",
            !isMobile && "bg-muted-foreground text-foreground"
          )}
          onClick={handleSwitchToDesktop}
        >
          <LaptopMinimalIcon className="size-4" />
          Desktop
        </button>
      </div>
      <div
        className="rounded-4xl overflow-hidden bg-muted transition-all duration-200"
        style={{ width: isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH }}
      >
        <div className="h-10 bg-muted-foreground"></div>
        <div className="p-4 bg-background" style={{ height: HEIGHT }}>
          <StepCard step={step} />
        </div>
        <div className="h-10 bg-muted-foreground"></div>
      </div>
    </aside>
  );
};

export default SidebarFrame;
