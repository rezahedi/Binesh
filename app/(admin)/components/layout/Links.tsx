import { cn } from "@/utils/cn";
import {
  Home,
  Package,
  LineChart,
  Users2,
  Settings,
  Shapes,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { name: "Dashboard", href: `/dashboard`, icon: Home },
  { name: "Courses", href: `/dashboard/courses`, icon: Shapes },
  { name: "Categories", href: `/dashboard/categories`, icon: Package },
  { name: "Learning Paths", href: ``, icon: Package },
  { name: "Analytics", href: ``, icon: LineChart },
  { name: "Users", href: ``, icon: Users2 },
];
const FOOTER_LINKS = [{ name: "Settings", href: ``, icon: Settings }];

const Links = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="#"
        className="flex md:w-full items-center gap-2 rounded-full text-2xl font-semibold md:text-2xl"
      >
        <Image
          src="/assets/binesh-logo.svg"
          width={36}
          height={36}
          alt="Binesh Logo"
          className="size-10 min-w-5"
        />
        <span className="sm:hidden sm:group-[.isOpen]:block">Binesh</span>
      </Link>
      {LINKS.map((link) => (
        <div key={link.name}>
          {link.href !== "" ? (
            <Link
              href={link.href}
              className={cn(
                `flex gap-2 items-center p-2 rounded-lg transition-colors hover:bg-muted`,
                pathname === link.href &&
                  "bg-accent text-accent-foreground hover:bg-accent/80"
              )}
            >
              <link.icon className="size-5 min-w-5" />
              <span className="lg:hidden lg:group-[.isOpen]:block">
                {link.name}
              </span>
            </Link>
          ) : (
            <div
              className={cn(
                `flex gap-2 items-center p-2 text-muted-foreground`
              )}
            >
              <link.icon className="size-5 min-w-5" />
              <span className="lg:hidden lg:group-[.isOpen]:block">
                {link.name}
              </span>
            </div>
          )}
        </div>
      ))}
      <div className="flex-1"></div>
      {FOOTER_LINKS.map((link) => (
        <div key={link.name}>
          {link.href !== "" ? (
            <Link
              href={link.href}
              aria-disabled
              className={`flex gap-2 items-center p-2 rounded-lg transition-colors hover:bg-muted ${
                pathname === link.href ? "bg-accent text-accent-foreground" : ""
              } ${link.href === "" ? "cursor-not-allowed" : ""}`}
            >
              <link.icon className="size-5 min-w-5" />
              <span className="lg:hidden lg:group-[.isOpen]:block">
                {link.name}
              </span>
            </Link>
          ) : (
            <div
              className={cn(
                `flex gap-2 items-center p-2 text-muted-foreground`
              )}
            >
              <link.icon className="size-5 min-w-5" />
              <span className="lg:hidden lg:group-[.isOpen]:block">
                {link.name}
              </span>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Links;
