'use client';

import useCourses from "@/lib/swr/use-courses";
import useCoursesCount from "@/lib/swr/use-courses-count";
import Image from "next/image"
import Link from "next/link"
import {
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"

import { Badge } from "@admin/components/ui/badge"
import { Button } from "@admin/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@admin/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@admin/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@admin/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@admin/components/ui/pagination"

export default function Courses() {
  const { courses, isValidating } = useCourses();
  const { data: count } = useCoursesCount();

  return (
    <div className="space-y-2">
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter by Category
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem checked>All categories</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Mathematics</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Biology</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter by Status
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem checked>All Status</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Reviewing</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Published</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="ml-auto">
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Course
          </span>
        </Button>
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
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Lessons
              </TableHead>
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
                {course.name}<br />
                <sub className="text-black/60">/{course.slug}</sub>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Link href={`./courses/?category=${course.category.slug}`}>
                  {course.category.name}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{['Draft', 'Reviewing', 'Published', 'Archived'][Math.floor(Math.random() * 3)]}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {course.lessens}
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
    </div>
  );
}
