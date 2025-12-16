import useRouterStuff from "@/hooks/use-router-stuff";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useFetch<T>(url: string) {
  const { getQueryString } = useRouterStuff();
  const { data, isLoading, error, isValidating } = useSWR<T>(
    `${url}${getQueryString()}`,
    fetcher,
    {
      dedupingInterval: 20000,
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
  };
}
