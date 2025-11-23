import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { needsApi } from "@/features/needs/api";
import type {
  MarkPurchasedInput,
  UpdateNeedInput,
} from "@/features/needs/schema";
import { showToast } from "@/lib/toast";

export const useNeeds = () => {
  const queryClient = useQueryClient();

  const {
    data: needs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["needs"],
    queryFn: needsApi.getAll,
  });

  const createNeedMutation = useMutation({
    mutationFn: needsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      showToast.success("Item added 🛒", "Added to shopping list.");
    },
    onError: () => {
      showToast.error("Failed to add item", "Please try again.");
    },
  });

  const updateNeedMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNeedInput }) =>
      needsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      showToast.success("Item updated ✓");
    },
    onError: () => {
      showToast.error("Failed to update item", "Please try again.");
    },
  });

  const markPurchasedMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MarkPurchasedInput }) =>
      needsApi.markPurchased(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });

      if (variables.data.createExpense) {
        showToast.success("Item purchased ✓", "Expense record created.");
      } else {
        showToast.success("Item marked as purchased ✓");
      }
    },
    onError: () => {
      showToast.error("Failed to mark as purchased", "Please try again.");
    },
  });

  const deleteNeedMutation = useMutation({
    mutationFn: needsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      showToast.success("Item removed", "Deleted from shopping list.");
    },
    onError: () => {
      showToast.error("Failed to delete item", "Please try again.");
    },
  });

  return {
    needs,
    isLoading,
    error,
    createNeed: createNeedMutation.mutate,
    isCreating: createNeedMutation.isPending,
    updateNeed: updateNeedMutation.mutate,
    isUpdating: updateNeedMutation.isPending,
    markPurchased: markPurchasedMutation.mutate,
    isMarkingPurchased: markPurchasedMutation.isPending,
    deleteNeed: deleteNeedMutation.mutate,
    isDeleting: deleteNeedMutation.isPending,
  };
};
