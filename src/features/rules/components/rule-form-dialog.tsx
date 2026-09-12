import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type {
  ActionType,
  CreateRuleInput,
  ModerationRule,
  RuleType,
} from "@/types/moderation-rule"

const ruleTypes = [
  { label: "Blacklist Word", value: "blacklist_word" },
  { label: "Whitelist Word", value: "whitelist_word" },
  { label: "Toxicity Threshold", value: "threshold" },
] satisfies {
  label: string
  value: RuleType
}[]

const actions = [
  { label: "Warn", value: "warn" },
  { label: "Delete", value: "delete" },
  { label: "Timeout", value: "timeout" },
  { label: "Ban", value: "ban" },
] satisfies {
  label: string
  value: ActionType
}[]

interface RuleFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  rule?: ModerationRule | null
  onSubmit: (input: CreateRuleInput) => void
  isSubmitting: boolean
}

export function RuleFormDialog({
  open,
  onOpenChange,
  rule,
  onSubmit,
  isSubmitting,
}: RuleFormDialogProps) {
  const isEdit = !!rule

  const [ruleType, setRuleType] = useState<RuleType>("blacklist_word")
  const [threshold, setThreshold] = useState("0.7")
  const [word, setWord] = useState("")
  const [actionOnTrigger, setActionOnTrigger] = useState<ActionType>("delete")

  useEffect(() => {
    if (rule) {
      setRuleType(rule.ruleType)
      setActionOnTrigger(rule.actionOnTrigger)

      if (rule.ruleType === "threshold") {
        setThreshold(String(rule.value.threshold))
      } else {
        setWord(rule.value.word)
      }
    } else {
      resetForm()
    }
  }, [rule, open])

  const resetForm = () => {
    setRuleType("blacklist_word")
    setThreshold("0.7")
    setWord("")
    setActionOnTrigger("delete")
  }

  const handleSubmit = () => {
    const value =
      ruleType === "threshold"
        ? {
            threshold: Number.parseFloat(threshold),
          }
        : {
            word,
          }

    onSubmit({
      ruleType,
      value,
      actionOnTrigger,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Moderation Rule" : "Add Moderation Rule"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update the moderation rule."
              : "Create a new moderation rule for your community."}
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <FieldLabel>Rule Type</FieldLabel>

            <Select
              items={ruleTypes}
              value={ruleType}
              onValueChange={(value) => setRuleType(value as RuleType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Rule Types</SelectLabel>

                  {ruleTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          {ruleType === "threshold" ? (
            <Field>
              <FieldLabel>Threshold (0.0 - 1.0)</FieldLabel>

              <Input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
              />
            </Field>
          ) : (
            <Field>
              <FieldLabel>Word</FieldLabel>

              <Input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="e.g. idiot"
              />
            </Field>
          )}

          <Field>
            <FieldLabel>Action on Trigger</FieldLabel>

            <Select
              items={actions}
              value={actionOnTrigger}
              onValueChange={(value) => setActionOnTrigger(value as ActionType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Action on Trigger</SelectLabel>

                  {actions.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEdit ? "Update Rule" : "Save Rule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
