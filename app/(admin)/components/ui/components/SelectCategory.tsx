import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/utils/cn"
import { Button } from "@admin/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandInput,
  CommandItem,
} from "@admin/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@admin/components/ui/popover"
import useCategories from "@/lib/swr/use-categories"

const items = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function SelectCategory({
  value,
  setData,
  required=false,
}: {
  value: string,
  setData: (value: string) => void,
  required?: boolean,
}) {
  const [open, setOpen] = useState(false)
  const { categories } = useCategories()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value && categories
            ? categories.find((item) => item.slug === value)?.name
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput name="test" placeholder="Search category..." required={required} />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            {categories && categories.map((item) => (
              <CommandItem
                key={item.id}
                value={item.slug}
                onSelect={(currentValue) => {
                  setData(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.slug ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
