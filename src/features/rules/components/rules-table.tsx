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
  onEdit: (rule: ModerationRule) => void
  onDelete: (rule: ModerationRule) => void
}

export function RulesTable({ rules, onEdit, onDelete }: RulesTableProps) {
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
        {rules.map((rule) => (
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
        ))}
      </TableBody>
    </Table>
  )
}
