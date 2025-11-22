import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { needsApi } from "@/features/needs/api";
import type {
  MarkPurchasedInput,
  UpdateNeedInput,
} from "@/features/needs/schema";
import { toast } from "@/lib/toast";

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
      toast.success("Item added", "Added to shopping list.");
    },
    onError: () => {
      toast.error("Error", "Failed to add item.");
    },
  });

  const updateNeedMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNeedInput }) =>
      needsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      toast.success("Item updated");
    },
    onError: () => {
      toast.error("Error", "Failed to update item.");
    },
  });

  const markPurchasedMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MarkPurchasedInput }) =>
      needsApi.markPurchased(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      const message = variables.data.createExpense
        ? "Item marked as purchased and expense created successfully."
        : "Item marked as purchased.";
      toast.success("Success", message);
    },
    onError: () => {
      toast.error("Error", "Failed to mark item as purchased.");
    },
  });

  const deleteNeedMutation = useMutation({
    mutationFn: needsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      toast.success("Item removed", "The item has been removed from your shopping list.");
    },
    onError: () => {
      toast.error("Error", "Failed to remove item.");
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
