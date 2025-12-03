import Link from "next/link";
import { LessonsProps } from "@/lib/types";
import { Footprints } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@admin/components/ui/popover";

const treeClasses = ["self-center", "self-start", "self-center", "self-end"];

export default function LessonCard({
  lesson,
  index,
  courseSlug,
}: {
  lesson: LessonsProps;
  index: number;
  courseSlug: string;
}) {
  return (
    <div
      key={lesson.id}
      className={`p-8 w-fit ${treeClasses[index % 4]} relative h-36 w-36`}
    >
      <div className="absolute flex flex-col gap-3 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <button className="group rotate-45 relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full border border-orange-600 p-6 font-medium text-orange-600 transition-all duration-100 shadow-[5px_5px] hover:translate-y-[3px] hover:shadow-[3px_3px] active:translate-y-[7px] active:shadow-[0px_0px]">
              <span className="-rotate-45">
                <Footprints />
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-4 items-center w-80 p-6 rounded-xl overflow-hidden bg-white text-balance text-center shadow-xl shadow-[0px_0px_25px_-5px_#0000003b]">
            <h3 className="text-xl font-bold">{lesson.name}</h3>
            <p>{lesson.description}</p>
            <Link
              href={`./${courseSlug}/${lesson.slug}`}
              className="mt-2 font-semibold rounded-full text-orange-600 border-2 border-orange-300 py-2 px-8 hover:border-orange-600 transition active:scale-95
            "
            >
              Start lesson
            </Link>
          </PopoverContent>
        </Popover>
        <span className="text-sm w-36 text-balance text-center">
          {lesson.name}
        </span>
      </div>
    </div>
  );
}
