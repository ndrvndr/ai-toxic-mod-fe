import { apiFetch } from "@/services/api-client"
import type { CreateRuleInput, ModerationRule } from "@/types/moderation-rule"

export const ModerationRulesServices = {
  async listRules(): Promise<ModerationRule[]> {
    const { data } = await apiFetch("/moderation-rules")
    return data
  },

  async createRule(input: CreateRuleInput): Promise<ModerationRule> {
    const { data } = await apiFetch("/moderation-rules", {
      method: "POST",
      body: JSON.stringify(input),
    })
    return data
  },

  async updateRule(
    id: string,
    input: CreateRuleInput
  ): Promise<ModerationRule> {
    const { data } = await apiFetch(`/moderation-rules/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    })

    return data
  },

  async deleteRule(id: string): Promise<void> {
    await apiFetch(`/moderation-rules/${id}`, { method: "DELETE" })
  },
}
