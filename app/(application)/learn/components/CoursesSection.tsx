import useFetch from "@/lib/swr/useFetch";
import { CourseWithCategoryProps } from "@/lib/types";
import CoursesCardLoadingSkeleton from "./CoursesCardLoadingSkeleton";
import { CourseCard } from "@/(application)/components";

const CoursesSection = ({
  title,
  apiUrl,
}: {
  title: string;
  apiUrl: string;
}) => {
  const { data: courses, isLoading } =
    useFetch<CourseWithCategoryProps[]>(apiUrl);

  if (!isLoading && !courses)
    return <p>Something went wrong, Please try again.</p>;

  return (
    <div>
      <h3 className="py-3 font-semibold text-xl">{title}</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading && <CoursesCardLoadingSkeleton count={4} />}
        {courses &&
          courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
      </div>
    </div>
  );
};

export default CoursesSection;
