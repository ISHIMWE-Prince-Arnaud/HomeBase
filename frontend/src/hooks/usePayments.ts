import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentsApi } from "@/features/payments/api";
import { useToast } from "@/hooks/use-toast";

export const usePayments = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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

      toast({
        title: "Payment recorded",
        description: "The payment has been successfully recorded.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to record payment.",
        variant: "destructive",
      });
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
