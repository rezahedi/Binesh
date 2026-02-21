import { SectionType } from "@/lib/quizParser";
import StepCard from "./StepCard";

const SidebarFrame = ({ step }: { step: SectionType | null }) => {
  return (
    <aside className="sticky top-4 shrink-0">
      <div className="space-y-2 rounded-md border bg-background p-3 w-[390] h-[844]">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground text-center">
          Step Preview
        </div>
        <StepCard step={step} />
      </div>
    </aside>
  );
};

export default SidebarFrame;
