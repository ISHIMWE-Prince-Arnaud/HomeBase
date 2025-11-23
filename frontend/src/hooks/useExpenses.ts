import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expensesApi } from "@/features/expenses/api";
import { toast } from "@/lib/toast";

export const useExpenses = () => {
  const queryClient = useQueryClient();

  const { data: expenses, isLoading: isLoadingExpenses } = useQuery({
    queryKey: ["expenses"],
    queryFn: expensesApi.getAll,
  });

  const { data: balance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ["expenses", "balance"],
    queryFn: expensesApi.getBalance,
  });

  const { data: settlementsResponse, isLoading: isLoadingSettlements } = useQuery({
    queryKey: ["expenses", "settlements"],
    queryFn: expensesApi.getSettlements,
  });

  const { data: mySettlementsResponse, isLoading: isLoadingMySettlements } = useQuery({
    queryKey: ["expenses", "settlements", "me"],
    queryFn: expensesApi.getMySettlements,
  });

  // Extract settlements arrays from responses
  const settlements = settlementsResponse?.settlements || [];
  const mySettlements = mySettlementsResponse?.settlements || [];
  const settlementsScale = settlementsResponse?.scale || 1;
  const mySettlementsScale = mySettlementsResponse?.scale || 1;

  const createExpenseMutation = useMutation({
    mutationFn: expensesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["expenses", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["expenses", "settlements"] });
      queryClient.invalidateQueries({ queryKey: ["expenses", "settlements", "me"] });
      toast.success("Expense added", "The expense has been recorded.");
    },
    onError: () => {
      toast.error("Error", "Failed to add expense.");
    },
  });

  return {
    expenses,
    balance,
    settlements,
    mySettlements,
    settlementsScale,
    mySettlementsScale,
    isLoading:
      isLoadingExpenses ||
      isLoadingBalance ||
      isLoadingSettlements ||
      isLoadingMySettlements,
    createExpense: createExpenseMutation.mutate,
    isCreating: createExpenseMutation.isPending,
  };
};
