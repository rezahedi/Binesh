import Image from "next/image";
import { redirect } from "next/navigation";

const Finish = () => {
  const handleContinue = () => {
    redirect("./");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <Image
          src={"/_temp/classical_mechanics-JYFpGo.png"}
          width={200}
          height={200}
          alt="A small celebration animation or confetti effect"
        />
        <h2 className="font-bold text-3xl my-16">
          Lesson
          <br />
          Complete!
        </h2>
        <span className="font-semibold text-zinc-400 uppercase">Total XP</span>
        <h2 className="font-bold text-6xl mt-2">80</h2>
      </div>
      <div className="flex gap-2 items-center sticky bottom-0 bg-white py-3">
        <button
          onClick={handleContinue}
          className="font-semibold p-3 px-6 mx-auto w-1/2 rounded-full bg-zinc-800 text-white cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Finish;
