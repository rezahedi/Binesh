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
import { CategoryProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryForm from "../CategoryForm";

export default function Page() {
  const { categoryId } = useParams();
  const { data, isLoading, error } = useFetch<CategoryProps>(
    `/api/admin/categories/${categoryId}`
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
    const response = await fetch(`/api/admin/categories/${categoryId}`, {
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
        <CardTitle>Edit Category</CardTitle>
        <CardDescription>
          Edit and update category details.
          <span className="float-right text-xs text-muted-foreground"></span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <form onSubmit={handleFormSave} className="space-y-4">
            <CategoryForm category={data} />
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
