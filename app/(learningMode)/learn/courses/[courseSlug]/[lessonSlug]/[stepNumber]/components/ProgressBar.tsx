import { cn } from "@/utils/cn";

export default function ProgressBar({
  title = "",
  progress = 0,
  focused = false,
  className = "",
}: {
  title?: string;
  progress: number;
  focused?: boolean;
  className?: string;
}) {
  if (progress < 0) progress = 0;
  if (progress > 100) progress = 100;
  return (
    <div
      className={cn("group cursor-pointer py-3 w-full", className)}
      title={title}
    >
      <div
        className={`border border-${
          focused ? "gray-300" : "transparent"
        } rounded-full p-0.5`}
      >
        <div className="w-full bg-gray-200 rounded-full h-2 group-hover:bg-gray-300">
          <div
            className="bg-[#29cc57] h-full rounded-full group-hover:bg-[#179e7e] transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
