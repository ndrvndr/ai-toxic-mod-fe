import { mutationOptions, queryOptions } from "@tanstack/react-query"

import { ModerationRulesServices } from "../services/moderation-rules.service"
import type { CreateRuleInput } from "@/types/moderation-rule"

export const moderationRulesKeys = {
  all: ["moderation-rules"] as const,
  list: () => [...moderationRulesKeys.all, "list"] as const,
}

export const moderationRulesQueryOptions = queryOptions({
  queryKey: moderationRulesKeys.list(),
  queryFn: ModerationRulesServices.listRules,
})

export const createModerationRuleMutationOptions = mutationOptions({
  mutationFn: ModerationRulesServices.createRule,
})

export const updateModerationRuleMutationOptions = mutationOptions({
  mutationFn: ({ id, input }: { id: string; input: CreateRuleInput }) =>
    ModerationRulesServices.updateRule(id, input),
})

export const deleteModerationRuleMutationOptions = mutationOptions({
  mutationFn: ModerationRulesServices.deleteRule,
})
