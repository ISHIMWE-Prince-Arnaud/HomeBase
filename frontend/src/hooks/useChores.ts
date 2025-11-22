import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { choresApi } from "@/features/chores/api";
import type { UpdateChoreInput } from "@/features/chores/schema";
import { useToast } from "@/hooks/use-toast";

export const useChores = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
      toast({
        title: "Chore created",
        description: "The chore has been successfully added.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create chore.",
        variant: "destructive",
      });
    },
  });

  const updateChoreMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateChoreInput }) =>
      choresApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chores"] });
      toast({ title: "Chore updated" });
    },
  });

  const completeChoreMutation = useMutation({
    mutationFn: choresApi.complete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chores"] });
      toast({ title: "Chore completed", description: "Great job!" });
    },
  });

  const deleteChoreMutation = useMutation({
    mutationFn: choresApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chores"] });
      toast({ title: "Chore deleted" });
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
