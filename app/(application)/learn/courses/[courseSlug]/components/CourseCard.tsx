import { CourseWithCategoryProps } from "@/lib/types";
import Image from "next/image";
import CourseProgressBar from "./CourseProgressBar";
import { cn } from "@/utils/cn";

const CourseCard = ({ course }: { course: CourseWithCategoryProps }) => {
  return (
    <div className="sticky top-28">
      <div
        className={cn(
          "p-8 border-[3px] border-b-[6px] border-muted rounded-3xl",
          course.progress?.percentage === 100 &&
            "border-primary-light bg-primary-light/2"
        )}
      >
        <Image
          src={course.image}
          alt={course.name}
          width={96}
          height={96}
          loading="lazy"
          className="float-right md:float-none"
        />
        <h1 className="md:my-6 text-2xl md:text-4xl font-bold text-balance">
          {course.name}
        </h1>
        <p className="my-3 md:my-6 text-card-foreground text-balance">
          {course.description}
        </p>
        <div className="flex gap-8 [&_b]:font-semibold [&_b]:text-xl">
          <p>
            <b>{course.lessonsCount}</b> Lessons
          </p>
          <p>
            <b>{course.estimatedDuration}</b> Minutes
          </p>
          <p>
            <b>{course.exercises}</b> Exercises
          </p>
        </div>

        <CourseProgressBar
          total={course.lessonsCount}
          completed={course.progress?.percentage || 0}
          time={course.progress?.timeSpent || 0}
        />
      </div>
    </div>
  );
};

export default CourseCard;
