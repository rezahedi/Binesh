import { cn } from "@/utils/cn";

export default function ProgressBar({
  title = "",
  progress = 0,
  className = "",
}: {
  title?: string;
  progress: number;
  className?: string;
}) {
  if (progress < 0) progress = 0;
  if (progress > 100) progress = 100;
  return (
    <div className={cn("group py-2 w-full", className)} title={title}>
      <div className={`rounded-full p-0.5`}>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="bg-primary/60 h-full rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
