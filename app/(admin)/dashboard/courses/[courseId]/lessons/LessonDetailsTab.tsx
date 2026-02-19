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
import { StatusType } from "@/db/schema";
import { LessonProps } from "@/lib/types";
import { cn } from "@/utils/cn";

type LessonDetailsFieldsProps = {
  lesson?: LessonProps | null;
  name: string;
  slug: string;
  description: string;
  isSlugUnique: boolean | null;
  statuses: readonly StatusType[];
  onNameChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onSlugBlur: (slug: string) => Promise<void>;
  onDescriptionChange: (value: string) => void;
};

const LessonDetailsTab = ({
  lesson,
  name,
  slug,
  description,
  isSlugUnique,
  statuses,
  onNameChange,
  onSlugChange,
  onSlugBlur,
  onDescriptionChange,
}: LessonDetailsFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="name">Name *:</Label>
        <Input
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="slug">URL Slug *:</Label>
        <Input
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => onSlugChange(e.target.value)}
          onBlur={(e) => onSlugBlur(e.target.value)}
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
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={5}
          className="resize-y"
        />
      </div>
      <div>
        <Label htmlFor="status">Status:</Label>
        <Select name="status" defaultValue={lesson?.status || statuses[0]}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
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

export default LessonDetailsTab;
