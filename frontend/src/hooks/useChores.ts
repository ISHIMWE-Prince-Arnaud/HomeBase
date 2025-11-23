import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { choresApi } from "@/features/chores/api";
import type { UpdateChoreInput } from "@/features/chores/schema";

export const useChores = () => {
  const queryClient = useQueryClient();

  const {
    data: chores,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chores"],
    queryFn: choresApi.getAll,
  });

  const createChoreMutation = useMutation({
    mutationFn: choresApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chores"] });
    },
  });

  const updateChoreMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateChoreInput }) =>
      choresApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chores"] });
    },
  });

  const completeChoreMutation = useMutation({
    mutationFn: choresApi.complete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chores"] });
    },
  });

  const deleteChoreMutation = useMutation({
    mutationFn: choresApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chores"] });
    },
  });

  return {
    chores,
    isLoading,
    error,
    createChore: createChoreMutation.mutate,
    isCreating: createChoreMutation.isPending,
    updateChore: updateChoreMutation.mutate,
    isUpdating: updateChoreMutation.isPending,
    completeChore: completeChoreMutation.mutate,
    isCompleting: completeChoreMutation.isPending,
    deleteChore: deleteChoreMutation.mutate,
    isDeleting: deleteChoreMutation.isPending,
  };
};

export const useChore = (id: number) => {
  return useQuery({
    queryKey: ["chores", id],
    queryFn: () => choresApi.getOne(id),
    enabled: !!id,
  });
};
