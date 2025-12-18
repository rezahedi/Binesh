"use client";

import { CategoryProps } from "@/lib/types";
import FilterDropdown from "./FilterDropdown";
import useFetch from "@/lib/swr/useFetch";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

const FilterCategories = () => {
  const { data, isLoading } = useFetch<CategoryProps[]>(
    `/api/admin/categories`
  );

  if (isLoading)
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-8 gap-1 animate-pulse pointer-events-none"
      >
        <ListFilter className="size-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Filter by Category
        </span>
      </Button>
    );

  return (
    <FilterDropdown
      name="Filter by Category"
      label="category"
      defaultOption="All categories"
      options={data?.map((cat) => ({ key: cat.slug, label: cat.name })) || []}
    />
  );
};

export default FilterCategories;
