"use client";

import "@/globals.css";
import Link from "next/link";
import { PanelLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbar from "@admin/components/layout/Navbar";
import { Toaster } from "sonner";
import Links from "./components/layout/Links";
import { UserButton, useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const user = useUser();
  if (!user) {
    router.push("/");
    return null;
  }

  // get data for breadcrumbs

  // FIXME: Sheet (sidebar drawer) stay open after any link click, it must be closed.

  return (
    <>
      <Toaster />
      <div
        id="sidebarNav"
        className="group isOpen flex flex-row min-h-screen w-full bg-muted/30"
      >
        <Navbar />
        <div className="flex-1 flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="md:hidden">
                  <PanelLeft className="size-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:max-w-xs">
                <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
                <nav className="text-lg font-medium h-full flex flex-col gap-4">
                  <Links />
                </nav>
              </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`${process.env.NEXT_PUBLIC_ADMIN_BASE}`}>
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_ADMIN_BASE}/courses`}
                    >
                      Courses
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Courses</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            {user && <UserButton />}
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
