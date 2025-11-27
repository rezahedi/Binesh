"use client";

import { useState } from "react";
import useCourses from "@/lib/swr/use-courses";
import useCoursesCount from "@/lib/swr/use-courses-count";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@admin/components/ui/badge";
import { Button } from "@admin/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@admin/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@admin/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@admin/components/ui/table";
import PaginationBlock from "@admin/components/ui/PaginationBlock";
import FilterDropdown from "@admin/components/ui/FilterDropdown";
import dynamic from "next/dynamic";
const AddEditModal = dynamic(
  () => import("@admin/dashboard/courses/AddEditModal")
);

export default function Courses() {
  const { courses, isValidating } = useCourses();
  const { data: count } = useCoursesCount();
  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);

  const handleAddCourse = () => {
    setShowAddEditModal(true);
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
      <Card>
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
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses?.map((course) => (
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
                      {course.name}
                      <br />
                      <sub className="text-black/60">/{course.slug}</sub>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Link
                        href={`./courses/?category=${course.category.slug}`}
                      >
                        {course.category.name}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {course.level}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {course.lessens}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        Published
                        {/* {
                          ["Draft", "Reviewing", "Published", "Archived"][
                            Math.floor(Math.random() * 3)
                          ]
                        } */}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {course.createdAt.toLocaleString()}
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
