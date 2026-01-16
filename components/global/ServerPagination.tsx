import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatNumber } from "@/lib/utils";
import { useTranslations } from "next-intl";

type ServerPaginationProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  locale: string;
  searchParams?: Record<string, string | null | undefined>;
  className?: string;
};

export function ServerPagination({
  currentPage,
  totalPages,
  baseUrl,
  locale,
  searchParams = {},
  className,
}: ServerPaginationProps) {
  const t = useTranslations("pagination");

  // Build URL with preserved search params and new page
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();

    // Add existing search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && value !== "none" && value !== "all") {
        params.set(key, value);
      }
    });

    // Add page param (only if not page 1)
    if (page > 1) {
      params.set("page", page.toString());
    }

    const queryString = params.toString();
    return `/${locale}${baseUrl}${queryString ? `?${queryString}` : ""}`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? buildUrl(currentPage - 1) : undefined}
              aria-label={t("previous")}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
              locale={locale}
            >
              {t("previous")}
            </PaginationPrevious>
          </PaginationItem>

          {getPageNumbers().map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={buildUrl(page)}
                  isActive={page === currentPage}
                  aria-label={t("page", { page })}
                >
                  {formatNumber(locale, page)}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href={
                currentPage < totalPages ? buildUrl(currentPage + 1) : undefined
              }
              aria-label={t("next")}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
              locale={locale}
            >
              {t("next")}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
