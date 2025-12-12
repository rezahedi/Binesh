import useRouterStuff from "@/hooks/use-router-stuff";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { CourseWithCategoryProps } from "@/lib/types";

export default function useCourses() {
  const {
    pathname,
    router,
    searchParams,
    searchParamsObj,
    queryParams,
    getQueryString,
  } = useRouterStuff();
  console.log(
    pathname,
    router,
    searchParams,
    searchParamsObj,
    getQueryString()
  );

  const { data, isLoading, error, isValidating } = useSWR<
    CourseWithCategoryProps[]
  >(
    pathname.startsWith("/dashboard")
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
    courses: data,
    isLoading,
    error,
    isValidating,
  };
}
