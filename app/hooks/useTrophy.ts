import { useEffect, useState } from "react";
import { useUser } from "@stackframe/stack";
import {
  getUserData,
  quizFailed,
  refillCells,
} from "@/(learningMode)/actions/trophy";
import { GetUserPointsResponse, StreakResponse } from "@trophyso/node/api";

const useTrophy = () => {
  const [cells, setCells] = useState<number | null>(null);
  const [streak, setStreak] = useState<StreakResponse | null>(null);
  const [points, setPoints] = useState<GetUserPointsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useUser();

  // TODO: Points may got changed, so there should be a way to sync points
  // or increase/decrease it based on event triggers without syncing with Trophy API
  // Like a optimistic update to decrease Trophy API calls
  // Changes: +1 on each step pass, +5 on quiz pass, +10 on lesson complete, -5 on quiz fail

  useEffect(() => {
    if (!user || streak || points) return;

    (async () => {
      setIsLoading(true);
      const response = await getUserData(user.id);
      console.log("User Data:", response);
      if (response) {
        setCells(response.cells.total);
        setStreak(response.streak);
        setPoints(response.points);
      }
      setIsLoading(false);
    })();
  }, [user, streak, points]);

  const decreaseCell = async () => {
    if (!user) return;
    if (!cells || cells <= 0) return;

    setIsLoading(true);
    setCells(cells - 1);
    console.log("Trophy mistake");
    await quizFailed(user.id);
    setIsLoading(false);
  };

  const increaseCell = async () => {
    if (!user || cells === null) return;

    setIsLoading(true);
    setCells(cells + 1);
    const response = await refillCells(user.id);
    if (!response) setCells(cells - 1);
    setIsLoading(false);
  };

  return { cells, decreaseCell, increaseCell, streak, points, isLoading };
};

export default useTrophy;
