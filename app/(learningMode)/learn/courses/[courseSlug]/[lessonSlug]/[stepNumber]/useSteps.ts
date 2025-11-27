import { SectionType } from "@/lib/quizParser";
import { useEffect, useState } from "react";

const useSteps = () => {
  const [steps, setSteps] = useState<SectionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      // TODO: Fetch all the parts
      const response = await fetch(
        "/api/content/computer-science/beginners-python-programming/welcome-to-python.md"
      );
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
