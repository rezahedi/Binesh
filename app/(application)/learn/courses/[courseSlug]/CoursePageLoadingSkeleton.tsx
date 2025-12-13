import { Skeleton } from "@/components/ui/skeleton";

const treeClasses = ["self-center", "self-start", "self-center", "self-end"];

const CoursePageLoadingSkeleton = () => {
  return (
    <div className="flex gap-4 md:gap-10 flex-col md:flex-row">
      <div className="flex-5 p-8 space-y-4">
        <Skeleton className="size-28 mb-8 float-right md:float-none" />
        <Skeleton className="h-10 w-8/12" />
        <Skeleton className="h-10 w-5/12" />
        <div className="flex gap-6 pt-8">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
      <div className="flex-6 flex flex-col mx-auto">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`${treeClasses[i % 4]} py-8 flex gap-4 items-center`}
          >
            <Skeleton className="rounded-full size-12" />
            <div className="w-44 space-y-2">
              <Skeleton className="h-5 w-10/12" />
              <Skeleton className="h-5 w-6/12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePageLoadingSkeleton;
