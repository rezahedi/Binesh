import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useFetch<T>(url: string) {
  const { data, isLoading, error, isValidating } = useSWR<T>(url, fetcher, {
    dedupingInterval: 20000,
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  return {
    data,
    isLoading,
    error,
    isValidating,
  };
}
