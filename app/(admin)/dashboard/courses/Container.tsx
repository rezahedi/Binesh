"use client";

import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationBlock from "@admin/components/ui/PaginationBlock";
import { useRouter } from "next/navigation";
import useFetch from "@/lib/swr/useFetch";
import { CourseWithCategoryProps } from "@/lib/types";
import FilterCategories from "@admin/components/ui/FilterCategories";
import FilterStatus from "@admin/components/ui/FilterStatus";
import { mutate } from "swr";

export default function Courses() {
  const { data, isLoading } = useFetch<{
    rows: CourseWithCategoryProps[];
    count: number;
  }>(`/api/admin/courses`);
  const { rows: courses, count } = data || { rows: null, count: null };
  const router = useRouter();

  const handleAddCourse = () => {
    router.push(`./courses/new`);
  };

  const handleEditClick = (courseId: string) => {
    router.push(`./courses/${courseId}`);
  };

  const handleDeleteClick = async (courseId: string) => {
    const res = await fetch(`/api/admin/courses/${courseId}`, {
      method: "DELETE",
    });
    if (!res.ok) return console.log("Couldn't remove the course!");
    mutate(
      (key) => typeof key === "string" && key.startsWith("/api/admin/courses"),
      undefined,
      { revalidate: true }
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <FilterCategories />
          <FilterStatus />
        </div>
        <div className="ml-auto">
          <Button size="sm" className="h-8 gap-1" onClick={handleAddCourse}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add New Course
            </span>
          </Button>
        </div>
      </div>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Courses</CardTitle>
          <CardDescription>
            Manage courses and view their lessons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Level</TableHead>
                <TableHead className="hidden md:table-cell">Lessons</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  Updated at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                courses &&
                courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={course.image}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link
                        href={`./courses/${course.id}/lessons`}
                        className={"hover:underline hover:text-primary"}
                      >
                        {course.name}
                        <br />
                        <sub className="text-black/60">/{course.slug}</sub>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {course.category && (
                        <Link
                          href={`./courses/?category=${course.category.slug}`}
                        >
                          {course.category.name}
                        </Link>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {course.level}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {course.lessonsCount}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(course.updatedAt).toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleEditClick(course.id)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(course.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>{count && <PaginationBlock count={count} />}</CardFooter>
      </Card>
    </div>
  );
}
