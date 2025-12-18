import useRouterStuff from "@/hooks/use-router-stuff";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ROWS_PER_PAGE } from "@/constants/dashboard";

type PaginationBlockProps = {
  count: number;
};

export default function PaginationBlock({ count }: PaginationBlockProps) {
  const PAGINATION_ITEMS = 5;
  const EACHSIDE_ITEMS = Math.floor(PAGINATION_ITEMS / 2);
  const pages = Math.ceil(count / ROWS_PER_PAGE) || 1;

  const { searchParams } = useRouterStuff();
  let currentPage = Number(searchParams.get("page")) || 1;
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

  const getSearchParamsPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    return `?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={getSearchParamsPage(currentPage - 1)} />
          </PaginationItem>
        )}
        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href={getSearchParamsPage(1)}>1</PaginationLink>
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
              href={getSearchParamsPage(page)}
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
            <PaginationNext href={getSearchParamsPage(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
