import useRouterStuff from "@/hooks/use-router-stuff";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { CourseProps, CategoryProps } from "@/lib/types";

export default function useCourses() {
  const { getQueryString } = useRouterStuff();

  const { data: courses, isValidating } = useSWR<
    (CourseProps & {
      category: CategoryProps;
    })[]
  >(
    window.location.pathname.startsWith("/dashboard")
      ? `/api/admin/courses${getQueryString()}`
      : `/api/courses${getQueryString()}`,
    fetcher,
    {
      dedupingInterval: 20000,
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  return {
    courses,
    isValidating,
  };
}
