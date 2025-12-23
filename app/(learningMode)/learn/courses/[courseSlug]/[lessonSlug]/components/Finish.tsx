import { Button } from "@/components/ui/button";
import { useProgress } from "@/contexts/ProgressContext";
import Image from "next/image";
import { redirect } from "next/navigation";

const Finish = () => {
  const { stats } = useProgress();

  const handleContinue = () => {
    redirect("./");
  };

  let msg = {
    title: "Perfect lesson!",
    description: "You made no mistakes in this lesson",
  };

  if (stats.failedQuizzes === 1) {
    msg = {
      title: "Lesson completed!",
      description: "You made a mistake, You did great!",
    };
  }
  if (stats.failedQuizzes > 1) {
    msg = {
      title: "Lesson completed!",
      description: `You made ${stats.failedQuizzes} mistakes, but learned a lot!`,
    };
  }

  return (
    <div className="flex flex-col h-dvh max-w-2xl mx-auto px-4">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <Image
          src={"/assets/alien-ship.svg"}
          width={160}
          height={160}
          alt="A small celebration animation or confetti effect"
          className="animate-[bounce_2s__linear_infinite]"
        />
        <h2 className="font-bold text-3xl mt-12 mb-2">{msg.title}</h2>
        <span className="font-semibold text-muted-foreground text-balance">
          {msg.description}
        </span>
        <div className="flex gap-4 w-full sm:w-auto mt-12">
          <div className="flex-1 flex flex-col rounded-xl bg-primary-light text-center p-1 font-bold w-48">
            <div className="uppercase text-sm p-1 text-primary-foreground">
              Total
            </div>
            <div className="grow rounded-lg bg-background flex items-center justify-center p-6 text-xl">
              <p>+{stats.getPoints()} Points</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col rounded-xl bg-accent text-center p-1 font-bold w-48">
            <div className="uppercase text-sm p-1 text-accent-foreground">
              Time
            </div>
            <div className="grow rounded-lg bg-background flex items-center justify-center p-6 text-xl">
              <p>{stats.getTime()} min</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center sticky bottom-0 bg-background py-3">
        <Button
          onClick={handleContinue}
          className="font-semibold mx-auto w-1/2"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Finish;
