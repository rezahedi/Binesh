"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import useFetch from "@/lib/swr/useFetch";
import { CourseProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CourseForm from "../CourseForm";

export default function Page() {
  const { courseId } = useParams();
  const { data, isLoading, error } = useFetch<CourseProps>(
    `/api/admin/courses/${courseId}`
  );
  const [savingMsg, setSavingMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleFormSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingMsg(null);
    const formData = new FormData(e.currentTarget);
    const json = Object.fromEntries(
      formData.entries().filter(([_, v]) => v !== "")
    );
    console.log(json);
    const response = await fetch(`/api/admin/courses/${courseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    if (!response.ok) {
      return setSavingMsg("Failed to save changes");
    }
    setSavingMsg("Changes saved successfully");
    router.push("./");
  };

  const handleCancel = () => {
    router.push("./");
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Edit Course</CardTitle>
        <CardDescription>
          Edit and update course details.
          <span className="float-right text-xs text-muted-foreground"></span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <form onSubmit={handleFormSave} className="space-y-4">
            <CourseForm course={data} />
            <div className="flex gap-4">
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
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
