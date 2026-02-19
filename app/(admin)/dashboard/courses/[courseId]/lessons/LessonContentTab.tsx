import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type LessonContentTabProps = {
  content: string;
  onContentChange: (value: string) => void;
};

const LessonContentTab = ({
  content,
  onContentChange,
}: LessonContentTabProps) => {
  return (
    <div>
      <Label htmlFor="content">Content *:</Label>
      <Textarea
        id="content"
        name="content"
        required
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        rows={15}
        className="resize-y"
      />
    </div>
  );
};

export default LessonContentTab;
