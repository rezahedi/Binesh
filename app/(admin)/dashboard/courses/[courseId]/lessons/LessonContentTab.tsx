import LessonContentEditor from "./LessonContentEditor";

type LessonContentTabProps = {
  content: string;
  onContentChange: (value: string) => void;
};

const LessonContentTab = ({
  content,
  onContentChange,
}: LessonContentTabProps) => {
  return (
    <LessonContentEditor content={content} onContentChange={onContentChange} />
  );
};

export default LessonContentTab;
