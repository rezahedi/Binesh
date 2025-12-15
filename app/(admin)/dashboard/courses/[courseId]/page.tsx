"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LEVEL_OPTIONS, STATUS_VALUES } from "@/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/lib/swr/useFetch";
import { CategoryProps, CourseProps } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { courseId } = useParams();
  const { data, isLoading, error } = useFetch<CourseProps>(
    `/api/admin/courses/${courseId}`
  );
  const { data: categories } = useFetch<CategoryProps[]>(
    `/api/admin/categories`
  );

  const handleFormSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const json = Object.fromEntries(formData.entries());
    console.log(json);
  };

  return (
    <Card className="bg-background">
      <form onSubmit={handleFormSave}>
        <CardHeader>
          <CardTitle>Course Title</CardTitle>
          <CardDescription>
            Edit and update course details.
            <span className="float-right text-xs text-muted-foreground"></span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && (
            <>
              <div>
                <Label htmlFor="name">Name:</Label>
                <Input id="name" name="name" defaultValue={data.name} />
              </div>
              <div>
                <Label htmlFor="description">Description:</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={data.name}
                  rows={5}
                  className="resize-y"
                />
              </div>
              <div>
                <Label htmlFor="level">Level:</Label>
                <Select name="level" defaultValue={String(data.level)}>
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
                <Select name="status" defaultValue={data.status}>
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
                <Select name="categoryID" defaultValue={data.categoryID}>
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
                <Input
                  id="image"
                  name="image"
                  type="file"
                  defaultValue={data.image}
                />
                {data.image}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant={"outline"} size={"sm"}>
            Cancel
          </Button>
          <Button variant={"default"} size={"sm"} type="submit">
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
