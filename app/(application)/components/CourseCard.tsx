import { CourseWithCategoryProps } from "@/lib/types";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export default function CourseCard(props: CourseWithCategoryProps) {
  const {
    // id,
    name,
    // description,
    slug,
    image,
    level,
    // categoryID,
    category,
    // ...rest
    progress,
  } = props;
  const disabled = props.lessonsCount === 0;

  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_APP_BASE}/courses/${slug}`}
      className={cn(
        "p-6 bg-card border-2 border-transparent rounded-xl",
        "shadow-sm",
        "hover:shadow-md hover:border-muted-foreground",
        "transition-all duration-300",
        "flex flex-col gap-2",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <Image
        src={image}
        alt={name}
        width={96}
        height={96}
        loading="lazy"
        className={cn("pb-1", disabled && "grayscale")}
      />
      {category && (
        <p
          className={cn(
            "uppercase text-xs font-medium text-orange-600",
            disabled && "text-foreground"
          )}
        >
          {category.name}
          {String(level) != "" && ` . LEVEL ${level}`}
        </p>
      )}
      <h4 className="flex-1 text-lg font-semibold text-balance">{name}</h4>
      {progress && (
        <div
          className="flex w-full h-2 bg-gray-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progress.percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="flex flex-col justify-center rounded-full overflow-hidden bg-[#179E7E] text-xs text-white text-center whitespace-nowrap transition duration-500"
            style={{ width: `${progress.percentage}%` }}
          ></div>
        </div>
      )}
    </Link>
  );
}
