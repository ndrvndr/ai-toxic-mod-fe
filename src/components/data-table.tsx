import type { ReactNode } from "react"

import { cn } from "cn"

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

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  isLoading?: boolean
  emptyMessage?: string
  skeletonRows?: number
}

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "No data found.",
  skeletonRows = 10,
}: DataTableProps<T>) {
  const isEmpty = !isLoading && data.length === 0

  return (
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
  )
}
