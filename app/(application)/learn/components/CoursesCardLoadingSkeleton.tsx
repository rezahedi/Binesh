import { Skeleton } from "@/components/ui/skeleton";

const CoursesCardLoadingSkeleton = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="flex flex-col gap-2 rounded-xl h-64" />
      ))}
    </>
  );
};

export default CoursesCardLoadingSkeleton;
