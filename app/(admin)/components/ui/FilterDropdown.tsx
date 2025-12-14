import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

type FilterDropdownProps = {
  name: string;
  defaultOption: string;
  options: string[];
};

export default function FilterDropdown({
  name,
  defaultOption,
  options,
}: FilterDropdownProps) {
  // TODO: Get the current filter from the query string

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem checked>
          {defaultOption}
        </DropdownMenuCheckboxItem>
        {options.map((option, index) => (
          <DropdownMenuCheckboxItem key={index}>
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
