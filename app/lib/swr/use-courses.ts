import useRouterStuff from "@/hooks/use-router-stuff";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { CourseProps, CategoryProps } from "@/lib/types";

export default function useCourses() {
  const { getQueryString } = useRouterStuff();

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (window.location.pathname.startsWith("/dashboard")) {
      setAdmin(true);
    }
  }, []);

  const { data: courses, isValidating } = useSWR<
    (CourseProps & {
      category: CategoryProps;
    })[]
  >(
    admin
      ? `/api/admin/courses${getQueryString()}`
      : `/api/courses${getQueryString()}`,
    fetcher,
    {
      dedupingInterval: 20000,
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  );

  return {
    courses,
    isValidating,
  };
}