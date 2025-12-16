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
import { STATUS_VALUES } from "@/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/lib/swr/useFetch";
import { LessonsProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { courseId, lessonId } = useParams();
  const { data, isLoading, error } = useFetch<LessonsProps>(
    `/api/admin/courses/${courseId}/lessons/${lessonId}`
  );
  const [savingMsg, setSavingMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleFormSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingMsg(null);
    const formData = new FormData(e.currentTarget);
    const json = Object.fromEntries(formData.entries());
    console.log(json);
    const response = await fetch(
      `/api/admin/courses/${courseId}/lessons/${lessonId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      }
    );
    if (!response.ok) {
      setSavingMsg("Failed to save changes");
    }
    setSavingMsg("Changes saved successfully");
  };

  const handleCancel = () => {
    router.push("./");
  };

  return (
    <Card className="bg-background">
      <form onSubmit={handleFormSave}>
        <CardHeader>
          <CardTitle>Lesson Title</CardTitle>
          <CardDescription>
            Edit and update lesson details and content.
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
                <Label htmlFor="content">Content:</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={data.content}
                  rows={15}
                  className="resize-y"
                />
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
                <Label htmlFor="unit">Unit:</Label>
                <Input id="unit" name="unit" defaultValue={data.unit} />
              </div>
              <div>
                <Label htmlFor="part">Part:</Label>
                <Input id="part" name="part" defaultValue={data.part} />
              </div>
              <div>
                <Label htmlFor="estimatedDuration">Estimated Duration:</Label>
                <Input
                  id="estimatedDuration"
                  name="estimatedDuration"
                  defaultValue={data.estimatedDuration}
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex gap-4">
          <p className="grow">{savingMsg}</p>
          <Button
            variant={"outline"}
            size={"sm"}
            type="button"
            onClick={handleCancel}
          >
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
