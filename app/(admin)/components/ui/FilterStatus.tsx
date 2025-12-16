"use client";

import { STATUS_VALUES } from "@/db/schema";
import FilterDropdown from "./FilterDropdown";

const FilterStatus = () => {
  return (
    <FilterDropdown
      name="Filter by Status"
      label="status"
      defaultOption="All Status"
      options={STATUS_VALUES.map((v) => ({ key: v, label: v }))}
    />
  );
};

export default FilterStatus;
