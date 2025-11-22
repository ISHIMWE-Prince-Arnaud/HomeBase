import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentsApi } from "@/features/payments/api";
import { toast } from "@/lib/toast";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      // Also invalidate expenses balance since payments affect it
      queryClient.invalidateQueries({ queryKey: ["expenses", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["expenses", "settlements"] });

      toast.success(
        "Payment recorded",
        "The payment has been successfully recorded."
      );
    },
    onError: () => {
      toast.error("Error", "Failed to record payment.");
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
