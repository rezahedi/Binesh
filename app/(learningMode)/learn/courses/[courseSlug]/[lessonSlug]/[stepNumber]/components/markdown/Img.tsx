import Image from "next/image";
import {ClassAttributes, ImgHTMLAttributes} from "react";
import {ExtraProps} from "react-markdown";

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
      <Image src={src} alt={alt || ""} title={title} width={300} height={300} />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
};

export default Img;
