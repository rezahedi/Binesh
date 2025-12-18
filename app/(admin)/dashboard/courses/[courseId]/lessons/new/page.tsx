"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LessonForm from "../LessonForm";
import { CourseProps } from "@/lib/types";
import useFetch from "@/lib/swr/useFetch";

export default function Page() {
  const { courseId } = useParams();
  const { data: course } = useFetch<CourseProps>(
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
    const response = await fetch(`/api/admin/courses/${courseId}/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    if (!response.ok) {
      return setSavingMsg("Failed to create new lesson");
    }
    setSavingMsg("New lesson created successfully");
    router.push("./");
  };

  const handleCancel = () => {
    router.push("./");
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>{course?.name}</CardTitle>
        <CardDescription>
          Create and add new lesson.
          <span className="float-right text-xs text-muted-foreground"></span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSave} className="space-y-4">
          <LessonForm />
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
      </CardContent>
    </Card>
  );
}
