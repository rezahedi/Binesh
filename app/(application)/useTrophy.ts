import { useEffect, useState } from "react";
import { useUser } from "@stackframe/stack";
import { getStreak } from "@/(learningMode)/actions/trophy";
import { StreakResponse } from "@trophyso/node/api";

const useTrophy = () => {
  const [streak, setStreak] = useState<StreakResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    (async () => {
      setIsLoading(true);
      const response = await getStreak(user.id);
      if (!response) {
        return;
      }
      setStreak(response);
      console.log(response);
      setIsLoading(false);
    })();
  }, [user]);

  return { streak, isLoading };
};

export default useTrophy;
