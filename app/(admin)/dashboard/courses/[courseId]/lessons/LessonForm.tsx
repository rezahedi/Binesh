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
import { STATUS_VALUES } from "@/db/schema";
import { LessonsProps } from "@/lib/types";

const LessonForm = ({ lesson }: { lesson?: LessonsProps | null }) => {
  return (
    <>
      <div>
        <Label htmlFor="name">Name *:</Label>
        <Input id="name" name="name" required defaultValue={lesson?.name} />
      </div>
      <div>
        <Label htmlFor="slug">URL Slug *:</Label>
        <Input id="slug" name="slug" required defaultValue={lesson?.slug} />
      </div>
      <div>
        <Label htmlFor="description">Description *:</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={lesson?.description}
          rows={5}
          className="resize-y"
        />
      </div>
      <div>
        <Label htmlFor="content">Content *:</Label>
        <Textarea
          id="content"
          name="content"
          required
          defaultValue={lesson?.content}
          rows={15}
          className="resize-y"
        />
      </div>
      <div>
        <Label htmlFor="status">Status:</Label>
        <Select name="status" defaultValue={lesson?.status || STATUS_VALUES[0]}>
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
      <div>
        <Label htmlFor="part">Part:</Label>
        <Input
          id="part"
          name="part"
          type="number"
          min="0"
          defaultValue={lesson?.part}
        />
      </div>
      <div>
        <Label htmlFor="estimatedDuration">
          Estimated Duration (in minutes):
        </Label>
        <Input
          id="estimatedDuration"
          name="estimatedDuration"
          type="number"
          min="0"
          defaultValue={lesson?.estimatedDuration}
        />
      </div>
    </>
  );
};

export default LessonForm;
