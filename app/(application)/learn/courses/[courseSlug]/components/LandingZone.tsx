import { cn } from "@/utils/cn";
import Image from "next/image";

const LandingZone = ({
  isActive = false,
  isFocused,
}: {
  isActive?: boolean;
  isFocused?: boolean | null;
}) => {
  return (
    <span className="size-24 relative">
      <svg
        className="absolute top-0 left-0"
        viewBox="-400 -400 800 800"
        xmlns="http://www.w3.org/2000/svg"
        fill="transparent"
      >
        <g transform="scale(1, 0.6)">
          {isFocused && (
            <circle
              cx="0"
              cy="0"
              r="300"
              className="animate-spin"
              strokeWidth="60"
              stroke={isActive ? "url(#light-active)" : "url(#light)"}
            />
          )}
          <circle
            cx="0"
            cy="0"
            r="230"
            className={cn("fill-gray-300", isActive && "fill-yellow-300")}
          />
          <circle
            className={cn("fill-gray-400", isActive && "fill-yellow-500")}
            cx="0"
            cy="-50"
            r="180"
          />
        </g>
        <defs>
          <radialGradient
            id="light"
            cx="0"
            cy="-300"
            r="600"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="30%" stopColor="#d1d5dc" stopOpacity="1" />
          </radialGradient>
          <radialGradient
            id="light-active"
            cx="0"
            cy="-300"
            r="600"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="30%" stopColor="#ffdf20" stopOpacity="1" />
          </radialGradient>
        </defs>
      </svg>
      <Image
        src={"/assets/alien-ship.svg"}
        width={30}
        height={30}
        alt="Alien Ship"
        className={cn(
          "mt-3 opacity-0 transition-opacity duration-100 block animate-bounce size-10 mx-auto",
          isFocused && "opacity-100"
        )}
      />
    </span>
  );
};

export default LandingZone;
