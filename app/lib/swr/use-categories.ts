import { useEffect, useState } from "react";
import { CategoryProps } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useCategories() {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (window.location.pathname.startsWith("/dashboard")) {
      setAdmin(true);
    }
  }, []);

  const { data: categories, isValidating } = useSWR<CategoryProps[]>(
    admin ? `/api/admin/categories` : `/api/categories`,
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
