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
    if (!user) return;

    (async () => {
      setIsLoading(true);
      const streakResponse = await getStreak(user.id);
      const pointsResponse = await getUserPoints(user.id);
      if (streakResponse) {
        setStreak(streakResponse);
        console.log("Streak:", streakResponse);
      }
      if (pointsResponse) {
        setPoints(pointsResponse);
        console.log("Points:", pointsResponse);
      }
      setIsLoading(false);
    })();
  }, [user]);

  return { streak, points, isLoading };
};

export default useTrophy;
