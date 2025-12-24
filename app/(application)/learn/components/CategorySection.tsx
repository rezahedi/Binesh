import useFetch from "@/lib/swr/useFetch";
import { CategoryProps, CourseWithCategoryProps } from "@/lib/types";
import CoursesCardLoadingSkeleton from "./CoursesCardLoadingSkeleton";
import { CourseCard } from "@/(application)/components";

const CategorySection = ({ categoryId }: { categoryId: string }) => {
  const { data, isLoading } = useFetch<
    CategoryProps & { courses: CourseWithCategoryProps[] }
  >(`/api/category/${categoryId}`);

  if (isLoading)
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <CoursesCardLoadingSkeleton count={4} />
      </div>
    );

  if (!data) return null;

  const { courses, ...category } = data;

  return (
    <div className="pb-8">
      <h3 className="font-semibold text-2xl">{category.name}</h3>
      <p>{category.description}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
