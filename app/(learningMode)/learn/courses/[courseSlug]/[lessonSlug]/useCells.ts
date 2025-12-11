import { useEffect, useState } from "react";
import { useUser } from "@stackframe/stack";
import {
  getUserEnergy,
  quizFailed,
  refillCells,
} from "@/(learningMode)/actions/trophy";

const useCells = () => {
  const [cells, setCells] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    (async () => {
      const energy = await getUserEnergy(user.id);
      if (!energy) {
        return;
      }
      setCells(energy.total);
    })();
  }, [user]);

  const decrease = async () => {
    if (!user) return;
    if (!cells || cells <= 0) return;

    setIsLoading(true);
    setCells(cells - 1);
    console.log("Trophy mistake");
    await quizFailed(user.id);
    setIsLoading(false);
  };

  const increase = async () => {
    if (!user || cells === null) return;

    setIsLoading(true);
    setCells(cells + 1);
    const response = await refillCells(user.id);
    if (!response) setCells(cells - 1);
    setIsLoading(false);
  };

  return { cells, decrease, increase, isLoading };
};

export default useCells;
