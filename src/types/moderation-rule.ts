export type RuleType = "threshold" | "blacklist_word" | "whitelist_word"
export type ActionType = "none" | "warn" | "delete" | "timeout" | "ban"

export type ModerationRule =
  | {
      id: string
      ruleType: "blacklist_word" | "whitelist_word"
      value: {
        word: string
      }
      actionOnTrigger: ActionType
      isActive: boolean
      createdAt: string
    }
  | {
      id: string
      ruleType: "threshold"
      value: {
        threshold: number
      }
      actionOnTrigger: ActionType
      isActive: boolean
      createdAt: string
    }

export interface CreateRuleInput {
  ruleType: RuleType
  value: Record<string, unknown>
  actionOnTrigger: ActionType
}
