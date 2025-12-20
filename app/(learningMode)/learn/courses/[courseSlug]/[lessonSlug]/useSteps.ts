import { SectionType } from "@/lib/quizParser";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const useSteps = () => {
  const [steps, setSteps] = useState<SectionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<number | null>(null);
  const { courseSlug, lessonSlug } = useParams();

  useEffect(() => {
    if (!courseSlug || !lessonSlug) return;

    (async () => {
      setLoading(true);

      // TODO: Fetch all the parts
      const response = await fetch(`/api/courses/${courseSlug}/${lessonSlug}`);
      if (!response.ok) {
        setError(response.status);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setSteps(data.steps);
      setLoading(false);
    })();
  }, [courseSlug, lessonSlug]);

  return { steps, loading, error };
};

export default useSteps;
