import Link from "next/link";
import { LessonsProps } from "@/lib/types";
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
    <div key={lesson.id} className={`py-4 ${treeClasses[index % 4]} relative`}>
      <div className="group">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex gap-3 items-center cursor-pointer">
              <span className="bg-[url('/assets/landing_zone.svg')] size-24">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 block animate-bounce text-4xl size-full">
                  🛸
                </span>
              </span>
              <span className="text-base font-semibold w-44 text-balance text-left">
                {lesson.name}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-4 items-center w-80 p-6 rounded-xl overflow-hidden bg-white text-balance text-center shadow-xl">
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
      </div>
    </div>
  );
}
