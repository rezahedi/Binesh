"use client";

import Image from "next/image";
import { cn } from "./utils/cn";
import { ReactNode } from "react";

const HeroFeatureCard = ({
  className = "",
  title,
  description,
  image,
  reverse = false,
}: {
  className?: string;
  title: ReactNode | string;
  description: string;
  image: string;
  reverse?: boolean;
}) => {
  return (
    <section className={cn("px-6 pt-20 sm:py-0", className)}>
      <div
        className={cn(
          "max-w-7xl mx-auto flex flex-col-reverse sm:flex-row items-center gap-10 sm:gap-0",
          reverse && "sm:flex-row-reverse"
        )}
      >
        <div className="sm:w-1/2 sm:pt-20 pb-0">
          <Image
            src={image}
            width={500}
            height={500}
            alt="App Screenshot"
            className="w-full"
          />
        </div>
        <div className={cn("sm:w-1/2 sm:p-20", reverse && "sm:text-right")}>
          <h3 className="font-semibold text-4xl sm:text-5xl text-balance mb-4 sm:mb-18">
            {title}
          </h3>
          <p className="text-balance text-lg text-foreground/80">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroFeatureCard;
