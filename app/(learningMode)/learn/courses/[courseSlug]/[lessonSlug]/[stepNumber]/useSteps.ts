import { SectionType } from "@/lib/quizParser";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const useSteps = () => {
  const [steps, setSteps] = useState<SectionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { courseSlug, lessonSlug } = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true);

      // TODO: Fetch all the parts
      const response = await fetch(`/api/courses/${courseSlug}/${lessonSlug}`);
      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setSteps(data.steps);
      setLoading(false);
    })();
  }, []);

  return { steps, loading, error };
};

export default useSteps;
