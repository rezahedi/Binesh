import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FilesIcon, HouseIcon } from "lucide-react";
import Link from "next/link";

const NavBar = ({ className }: { className?: string }) => {
  const { isMobile } = useMediaQuery();

  return (
    <nav className={className}>
      {isMobile ? (
        <ul className="flex gap-2 text-lg">
          <li>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_BASE}`}
              className="block p-2 rounded-full hover:bg-muted"
            >
              <HouseIcon className="size-6" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_BASE}/courses`}
              className="block p-2 rounded-full hover:bg-muted"
            >
              <FilesIcon className="size-6" />
              <span className="sr-only">Courses</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex gap-1 justify-center text-lg">
          <li>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_BASE}`}
              className="block p-2 px-6 rounded-full hover:bg-muted"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_BASE}/courses`}
              className="block p-2 px-6 rounded-full hover:bg-muted"
            >
              Courses
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
