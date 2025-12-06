import Image from "next/image";
import React from "react";

const LoadingContent = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;

  return (
    <div className="flex items-center justify-center h-full">
      <span className="text-9xl animate-bounce">
        <Image
          src={"/assets/alien-ship.svg"}
          width={100}
          height={60}
          alt="Alien Ship"
        />
      </span>
    </div>
  );
};

export default LoadingContent;
