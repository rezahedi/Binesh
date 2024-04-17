import useRouterStuff from "@/hooks/use-router-stuff";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useCoursesCount() {
  const { getQueryString } = useRouterStuff();

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (window.location.pathname.startsWith("/dashboard")) {
      setAdmin(true);
    }
  }, []);

  const { data, error } = useSWR<any>(
    admin
      ? `/api/admin/courses/count${getQueryString()}`
      : null,
    fetcher,
    {
      dedupingInterval: 30000,
      keepPreviousData: true,
    },
  );

  return {
    data,
    loading: !data && !error,
    error,
  };
}