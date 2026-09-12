import { useState } from "react"

import type { CreateRuleInput, ModerationRule } from "@/types/moderation-rule"

import { DeleteRuleDialog } from "./components/delete-rule-dialog"
import { RuleFormDialog } from "./components/rule-form-dialog"
import { RulesHeader } from "./components/rules-header"
import { RulesTable } from "./components/rules-table"
import { useRules } from "./hooks/use-rules"

export function RulesPage() {
  const {
    rules,
    isLoading,
    createRule,
    isCreating,
    updateRule,
    isUpdating,
    deleteRule,
    isDeleting,
  } = useRules()

  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [selectedRule, setSelectedRule] = useState<ModerationRule | null>(null)
  const [ruleToDelete, setRuleToDelete] = useState<ModerationRule | null>(null)

  const handleFormOpenChange = (open: boolean) => {
    setFormOpen(open)

    if (!open) {
      setSelectedRule(null)
    }
  }

  const handleEdit = (rule: ModerationRule) => {
    setSelectedRule(rule)
    setFormOpen(true)
  }

  const handleDelete = (rule: ModerationRule) => {
    setRuleToDelete(rule)
  }

  const handleSubmit = (input: CreateRuleInput) => {
    if (selectedRule) {
      updateRule(
        {
          id: selectedRule.id,
          input,
        },
        {
          onSuccess: () => {
            setFormOpen(false)
            setSelectedRule(null)
          },
        }
      )

      return
    }

    createRule(input, {
      onSuccess: () => {
        setFormOpen(false)
      },
    })
  }

  const handleConfirmDelete = (id: string) => {
    deleteRule(id, {
      onSuccess: () => {
        setRuleToDelete(null)
      },
    })
  }

  return (
    <div className="space-y-4">
      <RulesHeader
        onAddRule={() => {
          setSelectedRule(null)
          setFormOpen(true)
        }}
      />

      <RuleFormDialog
        open={formOpen}
        onOpenChange={handleFormOpenChange}
        rule={selectedRule}
        onSubmit={handleSubmit}
        isSubmitting={isCreating || isUpdating}
      />

      <RulesTable
        rules={rules}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <DeleteRuleDialog
        rule={ruleToDelete}
        open={ruleToDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setRuleToDelete(null)
          }
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
