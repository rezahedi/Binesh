import { useEffect, useState } from "react";
import { useUser } from "@stackframe/stack";
import { getStreak, getUserPoints } from "@/(learningMode)/actions/trophy";
import { GetUserPointsResponse, StreakResponse } from "@trophyso/node/api";

const useTrophy = () => {
  const [streak, setStreak] = useState<StreakResponse | null>(null);
  const [points, setPoints] = useState<GetUserPointsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useUser();

  useEffect(() => {
    if (!user || streak || points) return;

    (async () => {
      setIsLoading(true);
      const streakResponse = getStreak(user.id);
      const pointsResponse = getUserPoints(user.id);
      Promise.all([streakResponse, pointsResponse]).then((responses) => {
        if (responses[0]) {
          setStreak(responses[0]);
          console.log("Streak:", responses[0]);
        }
        if (responses[1]) {
          setPoints(responses[1]);
          console.log("Points:", responses[1]);
        }
      });
      setIsLoading(false);
    })();
  }, [user, streak, points]);

  return { streak, points, isLoading };
};

export default useTrophy;
