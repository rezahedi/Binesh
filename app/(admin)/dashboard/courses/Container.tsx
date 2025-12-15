"use client";

import { useState } from "react";
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
import FilterDropdown from "@admin/components/ui/FilterDropdown";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import useFetch from "@/lib/swr/useFetch";
import { CourseWithCategoryProps } from "@/lib/types";

const AddEditModal = dynamic(
  () => import("@admin/dashboard/courses/AddEditModal")
);

export default function Courses() {
  const { data: courses, isValidating } =
    useFetch<CourseWithCategoryProps[]>(`/api/admin/courses`);
  const count = 10; // FIXME: get rows total count from api
  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
  const router = useRouter();

  const handleAddCourse = () => {
    setShowAddEditModal(true);
  };

  const handleOpenLessons = (courseId: string) => {
    router.push(`/dashboard/courses/${courseId}`);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <FilterDropdown
            name="Filter by Category"
            defaultOption="All categories"
            options={["Mathematics", "Biology"]}
          />
          <FilterDropdown
            name="Filter by Status"
            defaultOption="All Status"
            options={["Draft", "Reviewing", "Published", "Archived"]}
          />
        </div>
        <div className="ml-auto">
          <Button size="sm" className="h-8 gap-1" onClick={handleAddCourse}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Course
            </span>
          </Button>
          {showAddEditModal && (
            <AddEditModal setShowModal={setShowAddEditModal} />
          )}
        </div>
      </div>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Courses</CardTitle>
          <CardDescription>
            Manage courses and view their lessons.
            <span className="float-right text-xs text-muted-foreground">
              Showing <b>1-10</b> of <b>{count}</b> products
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isValidating ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Level</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Lessons
                  </TableHead>
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
                {courses?.map((course) => (
                  <TableRow
                    key={course.id}
                    onClick={() => handleOpenLessons(course.id)}
                  >
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
                      {course.name}
                      <br />
                      <sub className="text-black/60">/{course.slug}</sub>
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <PaginationBlock count={count} />
        </CardFooter>
      </Card>
    </div>
  );
}
