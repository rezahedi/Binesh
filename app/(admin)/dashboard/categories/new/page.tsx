"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategoryForm from "../CategoryForm";

export default function Page() {
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
    const response = await fetch(`/api/admin/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    if (!response.ok) {
      return setSavingMsg("Failed to create new category");
    }
    setSavingMsg("New category created successfully");
    router.push("./");
  };

  const handleCancel = () => {
    router.push("./");
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>New Category</CardTitle>
        <CardDescription>
          Create new category details.
          <span className="float-right text-xs text-muted-foreground"></span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSave} className="space-y-4">
          <CategoryForm />
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
