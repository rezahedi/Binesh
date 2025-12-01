import { CategoryProps } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useCategories() {
  const { data: categories, isValidating } = useSWR<CategoryProps[]>(
    window.location.pathname.startsWith("/dashboard")
      ? `/api/admin/categories`
      : `/api/categories`,
    fetcher,
    {
      dedupingInterval: 30000,
    }
  );

  return {
    categories,
    loading: categories ? false : true,
    isValidating,
  };
}
