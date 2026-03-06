import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { STATUS_VALUES } from "@/db/schema";
import { LessonProps } from "@/lib/types";
import { useParams } from "next/navigation";
import { useState } from "react";
import LessonDetailsTab from "./LessonDetailsTab";
import LessonContentTab from "./LessonContentTab";

const LessonForm = ({ lesson }: { lesson?: LessonProps | null }) => {
  const [name, setName] = useState<string>(lesson?.name || "");
  const [slug, setSlug] = useState<string>(lesson?.slug || "");
  const [description, setDescription] = useState<string>(
    lesson?.description || ""
  );
  const [content, setContent] = useState<string>(lesson?.content || "");
  const [isSlugUnique, setIsSlugUnique] = useState<boolean | null>(null);
  const { courseId } = useParams();

  const createSlug = (str: string) => {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (lesson) return;
    setSlug(createSlug(value));
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
    <Tabs defaultValue={lesson ? "content" : "details"} className="w-full">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="space-y-4">
        <LessonDetailsTab
          lesson={lesson}
          name={name}
          slug={slug}
          description={description}
          isSlugUnique={isSlugUnique}
          statuses={STATUS_VALUES}
          onNameChange={handleNameChange}
          onSlugChange={setSlug}
          onSlugBlur={handleCheckSlug}
          onDescriptionChange={setDescription}
        />
      </TabsContent>
      <TabsContent value="content" className="space-y-4">
        <LessonContentTab content={content} onContentChange={setContent} />
      </TabsContent>
    </Tabs>
  );
};

export default LessonForm;
