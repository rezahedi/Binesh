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
import { LEVEL_OPTIONS, STATUS_VALUES } from "@/db/schema";
import useFetch from "@/lib/swr/useFetch";
import { CategoryProps, CourseProps } from "@/lib/types";
import { useState } from "react";

const CourseForm = ({ course }: { course?: CourseProps | null }) => {
  const { data: categories } = useFetch<CategoryProps[]>(
    `/api/admin/categories`
  );
  const [slug, setSlug] = useState<string>(course?.slug || "");

  const createSlug = (str: string) => {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (course) return;
    setSlug(createSlug(e.target.value));
  };

  return (
    <>
      <div>
        <Label htmlFor="name">Name *:</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={course?.name}
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
          defaultValue={course?.slug}
        />
      </div>
      <div>
        <Label htmlFor="description">Description *:</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={course?.description}
          rows={5}
          className="resize-y"
        />
      </div>
      <div>
        <Label htmlFor="level">Level:</Label>
        <Select name="level" defaultValue={String(course?.level || 0)}>
          <SelectTrigger id="level">
            <SelectValue placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectContent>
            {LEVEL_OPTIONS.map((level, index) => (
              <SelectItem key={index} value={String(index)}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status">Status:</Label>
        <Select name="status" defaultValue={course?.status || STATUS_VALUES[0]}>
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
        <Label htmlFor="category">Category:</Label>
        <Select name="categoryID" defaultValue={course?.categoryID}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="image">Image:</Label>
        <Input id="image" name="image" type="text" />
        {course?.image}
      </div>
    </>
  );
};

export default CourseForm;
