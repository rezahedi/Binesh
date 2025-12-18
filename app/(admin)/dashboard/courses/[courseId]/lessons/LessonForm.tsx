import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { STATUS_VALUES } from "@/db/schema";
import { LessonProps } from "@/lib/types";
import { cn } from "@/utils/cn";
import { useParams } from "next/navigation";
import { useState } from "react";

const LessonForm = ({ lesson }: { lesson?: LessonProps | null }) => {
  const [slug, setSlug] = useState<string>(lesson?.slug || "");
  const [isSlugUnique, setIsSlugUnique] = useState<boolean | null>(null);
  const { courseId } = useParams();

  const createSlug = (str: string) => {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (lesson) return;
    setSlug(createSlug(e.target.value));
  };

  const handleCheckSlug = async (slug: string) => {
    setIsSlugUnique(null);
    if (slug === "" || (lesson && lesson.slug === slug)) return;

    const res = await fetch(
      `/api/admin/courses/${courseId}/lessons/slug/${slug}`
    ).then((body) => body.text());
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
          defaultValue={lesson?.name}
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
          defaultValue={lesson?.description}
          rows={5}
          className="resize-y"
        />
      </div>
      <div>
        <Label htmlFor="content">Content *:</Label>
        <Textarea
          id="content"
          name="content"
          required
          defaultValue={lesson?.content}
          rows={15}
          className="resize-y"
        />
      </div>
      <div>
        <Label htmlFor="status">Status:</Label>
        <Select name="status" defaultValue={lesson?.status || STATUS_VALUES[0]}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_VALUES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="unit">Unit *:</Label>
        <Input
          id="unit"
          name="unit"
          type="number"
          min="1"
          required
          defaultValue={lesson?.unit}
        />
      </div>
    </>
  );
};

export default LessonForm;
