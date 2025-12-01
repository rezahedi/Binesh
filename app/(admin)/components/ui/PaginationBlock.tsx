import useRouterStuff from "@/hooks/use-router-stuff";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@admin/components/ui/pagination";

type PaginationBlockProps = {
  count: number;
};

export default function PaginationBlock({ count }: PaginationBlockProps) {
  const ROWS_PER_PAGE = 10;
  const PAGINATION_ITEMS = 5;
  const EACHSIDE_ITEMS = Math.floor(PAGINATION_ITEMS / 2);
  const pages = Math.ceil(count / ROWS_PER_PAGE) || 1;

  // Get current page from query string and set it to 1 if it's not a number
  const { searchParams } = useRouterStuff();
  let currentPage = Math.floor(Number(searchParams.get("page"))) || 1;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > pages) currentPage = pages;

  let start,
    end = 0;

  if (pages < PAGINATION_ITEMS) {
    start = 1;
    end = pages;
  } else {
    start = currentPage - EACHSIDE_ITEMS;
    end = currentPage + EACHSIDE_ITEMS;
    if (start < 1) {
      start = 1;
      end = PAGINATION_ITEMS;
    } else if (end > pages) {
      start = pages - PAGINATION_ITEMS + 1;
      end = pages;
    }
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
          </PaginationItem>
        )}
        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href="?page=1">1</PaginationLink>
            </PaginationItem>
            {currentPage > EACHSIDE_ITEMS + 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {end < pages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < pages && (
          <PaginationItem>
            <PaginationNext href={`?page=${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
