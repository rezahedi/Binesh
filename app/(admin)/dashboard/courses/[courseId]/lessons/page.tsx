"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";

import useFetch from "@/lib/swr/useFetch";
import { CourseProps, LessonsProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilterStatus from "@admin/components/ui/FilterStatus";
import Link from "next/link";

export default function Page() {
  const { courseId } = useParams();
  const { data, isLoading } = useFetch<{
    course: CourseProps;
    lessons: LessonsProps[];
  }>(`/api/admin/courses/${courseId}/lessons`);
  const { course, lessons } = data || { course: null, lessons: [] };
  const router = useRouter();

  const handleEditClick = (lessonId: string) => {
    router.push(`./lessons/${lessonId}`);
  };

  const handleNewClick = () => {
    router.push(`./lessons/new`);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <FilterStatus />
        </div>
        <div className="ml-auto">
          <Button size="sm" className="h-8 gap-1" onClick={handleNewClick}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add New Lesson
            </span>
          </Button>
        </div>
      </div>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>{course?.name}</CardTitle>
          <CardDescription>
            manage selected course&apos;s lessons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Unit</TableHead>
                <TableHead className="hidden md:table-cell">Part</TableHead>
                <TableHead className="hidden md:table-cell">
                  Estimated Duration
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
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                lessons.length > 0 &&
                lessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`./lessons/${lesson.id}`}
                        className={"hover:underline hover:text-primary"}
                      >
                        {lesson.name}
                        <br />
                        <sub className="text-black/60">/{lesson.slug}</sub>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {lesson.unit}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {lesson.part}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {lesson.estimatedDuration}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {lesson.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(lesson.updatedAt).toLocaleDateString("en-US", {
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
                            onClick={() => handleEditClick(lesson.id)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              {!isLoading && lessons.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No lessons found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
