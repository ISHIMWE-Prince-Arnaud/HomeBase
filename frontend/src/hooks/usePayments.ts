import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentsApi } from "@/features/payments/api";

export const usePayments = () => {
  const queryClient = useQueryClient();

  const {
    data: payments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: paymentsApi.getAll,
  });

  const createPaymentMutation = useMutation({
    mutationFn: paymentsApi.create,
    onSuccess: async () => {
      // Invalidate and refetch all related queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["payments"] }),
        queryClient.invalidateQueries({ queryKey: ["expenses"] }),
        queryClient.invalidateQueries({ queryKey: ["expenses", "balance"] }),
        queryClient.invalidateQueries({
          queryKey: ["expenses", "settlements"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["expenses", "settlements", "me"],
        }),
      ]);

      // Force refetch to ensure fresh data
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["expenses", "balance"] }),
        queryClient.refetchQueries({ queryKey: ["expenses", "settlements"] }),
        queryClient.refetchQueries({
          queryKey: ["expenses", "settlements", "me"],
        }),
      ]);
    },
  });

  return {
    payments,
    isLoading,
    error,
    createPayment: createPaymentMutation.mutate,
    isCreating: createPaymentMutation.isPending,
  };
};
