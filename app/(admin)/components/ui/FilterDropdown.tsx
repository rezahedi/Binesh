import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import useRouterStuff from "@/hooks/use-router-stuff";

type FilterDropdownProps = {
  name: string;
  label: string;
  defaultOption: string;
  options: { key: string; label: string }[];
};

export default function FilterDropdown({
  name,
  label,
  defaultOption,
  options,
}: FilterDropdownProps) {
  const { searchParams, setSearchParams } = useRouterStuff();
  const [position, setPosition] = useState<string>(
    searchParams.get(label) || ""
  );

  useEffect(() => {
    if (position === "" || position === searchParams.get(label)) return;

    setSearchParams({ [label]: position });
  }, [position, setSearchParams]);

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
      <DropdownMenuContent align="start" className="capitalize">
        <DropdownMenuLabel>{defaultOption}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.key} value={option.key}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
