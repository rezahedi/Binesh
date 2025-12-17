import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CategoryProps } from "@/lib/types";
import { cn } from "@/utils/cn";
import { useState } from "react";

const CategoryForm = ({ category }: { category?: CategoryProps | null }) => {
  const [slug, setSlug] = useState<string>(category?.slug || "");
  const [isSlugUnique, setIsSlugUnique] = useState<boolean | null>(null);

  const createSlug = (str: string) => {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category) return;
    setSlug(createSlug(e.target.value));
  };

  const handleCheckSlug = async (slug: string) => {
    setIsSlugUnique(null);
    if (slug === "" || (category && category.slug === slug)) return;

    const res = await fetch(`/api/admin/categories/slug/${slug}`).then((body) =>
      body.text()
    );
    setIsSlugUnique(Boolean(Number(res)));
  };

  return (
    <>
      <div>
        <Label htmlFor="name">Name *:</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={category?.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <Label htmlFor="slug">URL Slug *:</Label>
        <Input
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          onBlur={(e) => handleCheckSlug(e.target.value)}
        />
        {isSlugUnique !== null && (
          <i
            className={cn(
              "text-sm",
              isSlugUnique ? "text-green-500" : "text-red-500"
            )}
          >
            {isSlugUnique ? "The slug is unique" : "The slug is not unique"}
          </i>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description *:</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={category?.description}
          rows={5}
          className="resize-y"
        />
      </div>
    </>
  );
};

export default CategoryForm;
