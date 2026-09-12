import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createModerationRuleMutationOptions,
  deleteModerationRuleMutationOptions,
  moderationRulesKeys,
  moderationRulesQueryOptions,
  updateModerationRuleMutationOptions,
} from "../queries/moderation-rules.query"
import { toast } from "@/components/ui/toast"

export function useRules() {
  const queryClient = useQueryClient()

  const rulesQuery = useQuery(moderationRulesQueryOptions)

  const createRuleMutation = useMutation({
    ...createModerationRuleMutationOptions,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: moderationRulesKeys.all,
      })

      toast.add({
        type: "success",
        title: "Successfully added a rule",
      })
    },

    onError: (error) => {
      toast.add({
        type: "error",
        title: error.message || "Failed to add rule",
      })
    },
  })

  const updateRuleMutation = useMutation({
    ...updateModerationRuleMutationOptions,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: moderationRulesKeys.all,
      })

      toast.add({
        type: "success",
        title: "Successfully updated the rule",
      })
    },

    onError: (error) => {
      toast.add({
        type: "error",
        title: error.message || "Failed to update rule",
      })
    },
  })

  const deleteRuleMutation = useMutation({
    ...deleteModerationRuleMutationOptions,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: moderationRulesKeys.all,
      })

      toast.add({
        type: "success",
        title: "Successfully removed the rule",
      })
    },

    onError: (error) => {
      toast.add({
        type: "error",
        title: error.message || "Failed to remove the rule",
      })
    },
  })

  return {
    rules: rulesQuery.data ?? [],
    isLoading: rulesQuery.isLoading,
    isError: rulesQuery.isError,
    error: rulesQuery.error,

    createRule: createRuleMutation.mutate,
    isCreating: createRuleMutation.isPending,

    updateRule: updateRuleMutation.mutate,
    isUpdating: updateRuleMutation.isPending,

    deleteRule: deleteRuleMutation.mutate,
    isDeleting: deleteRuleMutation.isPending,
  }
}
