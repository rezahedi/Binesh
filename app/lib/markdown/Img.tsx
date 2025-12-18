import Image from "next/image";
import { ClassAttributes, ImgHTMLAttributes } from "react";
import { ExtraProps } from "react-markdown";

const Img = ({
  src,
  alt,
  title,
}: ClassAttributes<HTMLImageElement> &
  ImgHTMLAttributes<HTMLImageElement> &
  ExtraProps) => {
  if (!src) return null;

  return (
    <figure className="flex justify-center py-4">
      <Image
        src={String(src)}
        alt={alt || ""}
        title={title}
        width={500}
        height={300}
        className="w-full aspect-10/8 sm:aspect-16/10 object-contain"
      />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
};

export default Img;
