import { useState, Dispatch, SetStateAction } from "react";
import Modal from "@admin/components/ui/Modal";
import { Label } from "@admin/components/ui/label";
import { Input } from "@admin/components/ui/input";
import { Textarea } from "@admin/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@admin/components/ui/select";
import { Button } from "@admin/components/ui/button";
import { ImageIcon } from "lucide-react";
import { CourseProps, NewCourseProps } from "@/lib/types";
import { mutate } from "swr";
import { toast } from "sonner";
import SelectCategory from "@admin/components/ui/components/SelectCategory";
import Image from "next/image";
import { createSlug } from "@/utils/urls";

export default function AddEditModal({
  setShowModal,
  props,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  props?: CourseProps;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState<NewCourseProps>(
    props || {
      id: "",
      name: "",
      description: "",
      slug: "",
      level: 1,
      categoryID: "",
      image: "",
      lessens: 0,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    }
  );

  const { id, name, description, slug, level, categoryID, image } = data;

  // Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);

    // Get data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // TODO: Validate and sanitize data

    // Set endpoint
    const endpoint = id
      ? {
          method: "PATCH",
          url: `/api/admin/courses/${id}`,
          successMessage: "Successfully updated the course!",
        }
      : {
          method: "POST",
          url: `/api/admin/courses`,
          successMessage: "Successfully added the new course!",
        };

    // Send data to the server
    console.log("fetch:", endpoint.url, endpoint.method, data);
    fetch(endpoint.url, {
      method: endpoint.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      console.log("res:", res);
      if (res.status === 200 || res.status === 201) {
        await mutate(
          (key) =>
            typeof key === "string" && key.startsWith("/api/admin/courses"),
          undefined,
          { revalidate: true }
        );
        toast.success(endpoint.successMessage);
        setShowModal(false);
      } else {
        const error = await res.json();
        toast.error(error.message);
      }

      setSaving(false);
    });
  };

  // Set image preview
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !e.target.files ||
      e.target.files.length === 0 ||
      !e.target.files[0].type.includes("image")
    )
      return;

    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  // Check required input values to enable save button
  const saveDisabled = () =>
    saving ||
    !name ||
    !slug ||
    !level ||
    !categoryID ||
    !description ||
    !image ||
    (props &&
      Object.entries(props).every(
        ([key, value]) => data[key as keyof typeof data] === value
      ));

  return (
    <Modal setShowModal={setShowModal}>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Add New Course</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Fill out the form to create a new course.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    let newSlug = slug;
                    // Check if slug manually doesn't changed
                    if (slug == "" || slug === createSlug(name))
                      newSlug = createSlug(e.target.value);
                    setData({ ...data, name: e.target.value, slug: newSlug });
                  }}
                  placeholder="Enter course name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => {
                    if (name)
                      setData({ ...data, slug: createSlug(e.target.value) });
                  }}
                  placeholder="Enter course slug"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level *</Label>
                <Select
                  required
                  name="level"
                  value={level.toString()}
                  onValueChange={(value) =>
                    setData({ ...data, level: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Beginner</SelectItem>
                    <SelectItem value="2">Intermediate</SelectItem>
                    <SelectItem value="3">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <SelectCategory
                  value={categoryID}
                  setData={(value) => {
                    setData({ ...data, categoryID: value });
                  }}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="image">Image *</Label>
                <Input
                  id="image"
                  name="image"
                  value={image}
                  onChange={(e) => {
                    handleImagePreview(e);
                    setData({ ...data, image: e.target.value });
                  }}
                  required
                  type="file"
                />
              </div>
              <div className="space-y-2 flex flex-col items-center justify-center aspect-square border border-gray-200 rounded-lg">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Course image"
                    className="object-contain w-full h-full rounded-lg"
                  />
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                    <p className="text-gray-400 text-sm">
                      Image will appear here.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
              placeholder="Enter course description"
              required
            />
          </div>
          <Button className="w-full" type="submit" disabled={saveDisabled}>
            Create Course
          </Button>
        </form>
      </div>
    </Modal>
  );
}
