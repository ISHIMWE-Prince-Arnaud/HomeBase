import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { needsApi } from "@/features/needs/api";
import type {
  MarkPurchasedInput,
  UpdateNeedInput,
} from "@/features/needs/schema";
import { useToast } from "@/hooks/use-toast";

export const useNeeds = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
      toast({ title: "Item added", description: "Added to shopping list." });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item.",
        variant: "destructive",
      });
    },
  });

  const updateNeedMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNeedInput }) =>
      needsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      toast({ title: "Item updated" });
    },
  });

  const markPurchasedMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MarkPurchasedInput }) =>
      needsApi.markPurchased(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      const message = variables.data.createExpense
        ? "Item purchased and expense created."
        : "Item marked as purchased.";
      toast({ title: "Success", description: message });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update item.",
        variant: "destructive",
      });
    },
  });

  const deleteNeedMutation = useMutation({
    mutationFn: needsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      toast({ title: "Item removed" });
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
