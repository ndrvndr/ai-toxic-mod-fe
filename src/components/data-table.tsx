import type { MouseEvent, ReactNode } from "react"

import { cn } from "cn"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

export interface DataTableColumn<T> {
  header: ReactNode
  cell: (item: T) => ReactNode
  className?: string
  skeletonClassName?: string
}

export interface DataTablePagination {
  page: number
  limit: number
  total: number
  totalPages: number
  onPageChange: (page: number) => void
  isFetching?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  isLoading?: boolean
  emptyMessage?: string
  skeletonRows?: number
  pagination?: DataTablePagination
}

function getPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ])
  const sortedPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)

  return sortedPages.flatMap((page, index) => {
    const previousPage = sortedPages[index - 1]
    return previousPage && page - previousPage > 1 ? ["ellipsis", page] : [page]
  })
}

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "No data found.",
  skeletonRows = 10,
  pagination,
}: DataTableProps<T>) {
  const isEmpty = !isLoading && data.length === 0
  const pageItems = pagination
    ? getPageItems(pagination.page, pagination.totalPages)
    : []

  const handlePageChange = (
    event: MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    event.preventDefault()
    pagination?.onPageChange(page)
  }

  return (
    <div className="space-y-4">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: skeletonRows }).map((_, rowIndex) => (
              <TableRow key={`skeleton-${rowIndex}`}>
                {columns.map((column, columnIndex) => (
                  <TableCell key={columnIndex}>
                    <div
                      className={cn(
                        "h-5 w-20 animate-pulse rounded-xl bg-card-foreground dark:bg-card",
                        column.skeletonClassName
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : isEmpty ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <TableCell key={columnIndex} className={column.className}>
                    {column.cell(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {pagination && (
        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing{" "}
            {(pagination.page - 1) * pagination.limit + (data.length ? 1 : 0)}–
            {(pagination.page - 1) * pagination.limit + data.length} of{" "}
            {pagination.total} results
          </p>
          <Pagination className="mx-0 w-auto sm:ml-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) =>
                    handlePageChange(event, pagination.page - 1)
                  }
                  aria-disabled={pagination.page <= 1 || pagination.isFetching}
                  className={cn(
                    (pagination.page <= 1 || pagination.isFetching) &&
                      "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
              {pageItems.map((item, index) =>
                typeof item === "string" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      isActive={item === pagination.page}
                      onClick={(event) => handlePageChange(event, item)}
                      aria-label={`Go to page ${item}`}
                      aria-disabled={pagination.isFetching}
                      className={cn(
                        pagination.isFetching &&
                          "pointer-events-none opacity-50"
                      )}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) =>
                    handlePageChange(event, pagination.page + 1)
                  }
                  aria-disabled={
                    pagination.page >= pagination.totalPages ||
                    pagination.isFetching
                  }
                  className={cn(
                    (pagination.page >= pagination.totalPages ||
                      pagination.isFetching) &&
                      "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
