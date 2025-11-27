"use client";

import React from "react";
import Link from "next/link";
import {
  Package2,
  Home,
  Package,
  LineChart,
  Users2,
  Settings,
  PanelLeft,
  Shapes,
} from "lucide-react";
import ToggleSidebarBtn from "@admin/components/layout/ToggleSidebarBtn";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  const links = [
    { name: "Dashboard", href: `/dashboard`, icon: Home },
    { name: "Courses", href: `/dashboard/courses`, icon: Shapes },
    { name: "Categories", href: `/dashboard/categories`, icon: Package },
    { name: "Learning Paths", href: `/dashboard/paths`, icon: Package },
    { name: "Analytics", href: ``, icon: LineChart },
    { name: "Users", href: ``, icon: Users2 },
  ];

  const links2 = [{ name: "Settings", href: ``, icon: Settings }];

  return (
    <aside className="w-14 lg:w-20 lg:group-[.isOpen]:w-56 border-r bg-background hidden md:block transition-all duration-200">
      <div className="fixed w-14 lg:w-20 lg:group-[.isOpen]:w-56 inset-y-0 left-0 z-10 flex flex-col py-5 px-2 lg:px-5 transition-all duration-200 overflow-hidden">
        <nav className="flex flex-col flex-1 gap-4">
          <Link
            href="#"
            className="flex size-9 md:w-full items-center p-2 gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="size-5 min-w-5" />
            <span className="hidden lg:group-[.isOpen]:block">Binesh</span>
          </Link>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex gap-2 size-9 md:w-full items-center p-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground ${
                pathname === link.href ? "bg-accent text-accent-foreground" : ""
              } ${link.href === "" ? "cursor-not-allowed" : ""}`}
            >
              <link.icon className="size-5 min-w-5" />
              <span className="hidden lg:group-[.isOpen]:block">
                {link.name}
              </span>
            </Link>
          ))}
          <div className="flex-1"></div>
          {links2.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex gap-2 size-9 md:w-full items-center p-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground ${
                pathname === link.href ? "bg-accent text-accent-foreground" : ""
              } ${link.href === "" ? "cursor-not-allowed" : ""}`}
            >
              <link.icon className="size-5 min-w-5" />
              <span className="hidden lg:group-[.isOpen]:block">
                {link.name}
              </span>
            </Link>
          ))}
          <ToggleSidebarBtn className="hidden lg:flex gap-2 size-9 md:w-full items-center p-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground">
            <PanelLeft className="size-5 min-w-5" />
            <span className="hidden lg:group-[.isOpen]:block text-nowrap">
              Toggle Menu
            </span>
          </ToggleSidebarBtn>
        </nav>
      </div>
    </aside>
  );
}
