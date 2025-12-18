"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import useFetch from "@/lib/swr/useFetch";
import { CategoryProps } from "@/lib/types";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

export default function Page() {
  const { data, isLoading } = useFetch<
    (CategoryProps & { coursesCount: number })[]
  >(`/api/admin/categories`);
  const router = useRouter();

  const handleAddCourse = () => {
    router.push(`./categories/new`);
  };

  const handleEditClick = (catId: string) => {
    router.push(`./categories/${catId}`);
  };

  const handleDeleteClick = async (catId: string) => {
    const res = await fetch(`/api/admin/categories/${catId}`, {
      method: "DELETE",
    });
    if (!res.ok) return console.log("Couldn't remove the category!");
    mutate(`/api/admin/categories`);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <div className="flex items-center gap-2"></div>
        <div className="ml-auto">
          <Button size="sm" className="h-8 gap-1" onClick={handleAddCourse}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add New Category
            </span>
          </Button>
        </div>
      </div>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Manage courses and view their lessons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead className="hidden md:table-cell">Courses</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                data &&
                data.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`./courses/?category=${cat.slug}`}
                        className={"hover:underline hover:text-primary"}
                      >
                        {cat.name}
                        <br />
                        <sub className="text-black/60">/{cat.slug}</sub>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {cat.description}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {cat.coursesCount}
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
                            onClick={() => handleEditClick(cat.id)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(cat.id)}
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
      </Card>
    </div>
  );
}
