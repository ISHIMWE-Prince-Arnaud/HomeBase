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

  const { data: settlements, isLoading: isLoadingSettlements } = useQuery({
    queryKey: ["expenses", "settlements"],
    queryFn: expensesApi.getSettlements,
  });

  const { data: mySettlements, isLoading: isLoadingMySettlements } = useQuery({
    queryKey: ["expenses", "settlements", "me"],
    queryFn: expensesApi.getMySettlements,
  });

  const createExpenseMutation = useMutation({
    mutationFn: expensesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
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
    isLoading:
      isLoadingExpenses ||
      isLoadingBalance ||
      isLoadingSettlements ||
      isLoadingMySettlements,
    createExpense: createExpenseMutation.mutate,
    isCreating: createExpenseMutation.isPending,
  };
};
