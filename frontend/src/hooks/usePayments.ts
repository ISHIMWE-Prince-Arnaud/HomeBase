import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentsApi } from "@/features/payments/api";
import { showToast } from "@/lib/toast";

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

      showToast.success("Payment recorded ✓", "Balances have been updated.");
    },
    onError: (error: unknown) => {
      // Handle specific backend error messages
      let errorMessage = "Failed to record payment.";

      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data &&
        typeof error.response.data.message === "string"
      ) {
        errorMessage = error.response.data.message;
      }

      // Provide user-friendly error messages
      if (errorMessage.includes("No direct debt")) {
        showToast.error(
          "Cannot record payment",
          "You don't owe this person any money. Check your settlements."
        );
      } else if (errorMessage.includes("exceeds the direct debt")) {
        showToast.error(
          "Amount too high",
          "The payment exceeds what you owe. Please check your balance."
        );
      } else {
        showToast.error("Payment failed", errorMessage);
      }
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
