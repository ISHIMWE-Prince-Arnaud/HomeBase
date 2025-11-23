import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { needsApi } from "@/features/needs/api";
import type {
  MarkPurchasedInput,
  UpdateNeedInput,
} from "@/features/needs/schema";

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
    },
  });

  const updateNeedMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNeedInput }) =>
      needsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
    },
  });

  const markPurchasedMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MarkPurchasedInput }) =>
      needsApi.markPurchased(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  const deleteNeedMutation = useMutation({
    mutationFn: needsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["needs"] });
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
