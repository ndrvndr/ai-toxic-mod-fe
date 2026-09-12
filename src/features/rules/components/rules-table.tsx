import { MoreHorizontalIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ModerationRule } from "@/types/moderation-rule"

interface RulesTableProps {
  rules: ModerationRule[]
  isLoading?: boolean
  onEdit: (rule: ModerationRule) => void
  onDelete: (rule: ModerationRule) => void
}

const SKELETON_ROWS = 10

export function RulesTable({
  rules,
  isLoading = false,
  onEdit,
  onDelete,
}: RulesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          Array.from({ length: SKELETON_ROWS }).map((_, index) => (
            <TableRow key={`skeleton-${index}`}>
              <TableCell>
                <div className="h-5 w-20 animate-pulse rounded-xl bg-card-foreground dark:bg-card" />
              </TableCell>

              <TableCell>
                <div className="h-5 w-32 animate-pulse rounded-xl bg-card-foreground dark:bg-card" />
              </TableCell>

              <TableCell>
                <div className="h-5 w-20 animate-pulse rounded-xl bg-card-foreground dark:bg-card" />
              </TableCell>

              <TableCell>
                <div className="h-5 w-16 animate-pulse rounded-xl bg-card-foreground dark:bg-card" />
              </TableCell>

              <TableCell className="text-right">
                <div className="ml-auto size-5 animate-pulse rounded bg-card-foreground dark:bg-card" />
              </TableCell>
            </TableRow>
          ))
        ) : rules.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-32 text-center text-muted-foreground"
            >
              No moderation rules found.
            </TableCell>
          </TableRow>
        ) : (
          rules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell className="capitalize">
                {rule.ruleType.replace("_", " ")}
              </TableCell>

              <TableCell>
                {rule.ruleType === "threshold"
                  ? `≥ ${rule.value.threshold}`
                  : `"${rule.value.word}"`}
              </TableCell>

              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {rule.actionOnTrigger}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge variant={rule.isActive ? "default" : "secondary"}>
                  {rule.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />

                        <span className="sr-only">Open menu</span>
                      </Button>
                    }
                  />

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(rule)}>
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onDelete(rule)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
