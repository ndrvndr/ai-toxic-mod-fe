import { MoreHorizontalIcon } from "lucide-react"

import type { DataTableColumn } from "@/components/data-table"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ModerationRule } from "@/types/moderation-rule"

interface RulesTableProps {
  rules: ModerationRule[]
  isLoading?: boolean
  onEdit: (rule: ModerationRule) => void
  onDelete: (rule: ModerationRule) => void
}

export function RulesTable({
  rules,
  isLoading = false,
  onEdit,
  onDelete,
}: RulesTableProps) {
  const columns: DataTableColumn<ModerationRule>[] = [
    {
      header: "Type",
      cell: (rule) => (
        <span className="capitalize">{rule.ruleType.replace("_", " ")}</span>
      ),
      className: "w-[20%]",
    },
    {
      header: "Value",
      cell: (rule) =>
        rule.ruleType === "threshold"
          ? `≥ ${rule.value.threshold}`
          : `"${rule.value.word}"`,
      className: "w-[20%]",
    },
    {
      header: "Action",
      cell: (rule) => (
        <Badge variant="outline" className="capitalize">
          {rule.actionOnTrigger}
        </Badge>
      ),
      className: "w-[20%]",
    },
    {
      header: "Status",
      cell: (rule) => (
        <Badge variant={rule.isActive ? "default" : "secondary"}>
          {rule.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
      className: "w-[20%]",
    },
    {
      header: <div className="text-right">Actions</div>,
      className: "text-right w-[10%]",
      cell: (rule) => (
        <div className="flex justify-end">
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
        </div>
      ),
      skeletonClassName: "ml-auto size-5 rounded",
    },
  ]

  return (
    <DataTable
      data={rules}
      columns={columns}
      isLoading={isLoading}
      emptyMessage="No moderation rules found."
    />
  )
}
