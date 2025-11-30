import useRouterStuff from "@/hooks/use-router-stuff";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useCoursesCount() {
  const { getQueryString } = useRouterStuff();

  const { data, error } = useSWR<string>(
    window.location.pathname.startsWith("/dashboard")
      ? `/api/admin/courses/count${getQueryString()}`
      : null,
    fetcher,
    {
      dedupingInterval: 30000,
      keepPreviousData: true,
    }
  );

  return {
    data: Number(data),
    loading: !data && !error,
    error,
  };
}
