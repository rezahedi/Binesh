import Image from "next/image";
import React from "react";

const LoadingContent = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <Image
        className="animate-bounce"
        src={"/assets/alien-ship.svg"}
        width={100}
        height={60}
        alt="Alien Ship"
      />
      <span className="text-xl">Preparing the Lesson</span>
    </div>
  );
};

export default LoadingContent;
