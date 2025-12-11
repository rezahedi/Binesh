import { useEffect, useState } from "react";
import { useUser } from "@stackframe/stack";
import { getUserEnergy, mistake } from "@/(learningMode)/actions/trophy";

const useCells = () => {
  const [cells, setCells] = useState<number | null>(null);
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

    setCells(cells - 1);
    console.log("Trophy mistake");
    await mistake(user.id);
  };

  return { cells, decrease };
};

export default useCells;
