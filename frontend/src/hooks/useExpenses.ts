import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expensesApi } from "@/features/expenses/api";
import { useToast } from "@/hooks/use-toast";

export const useExpenses = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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

  const createExpenseMutation = useMutation({
    mutationFn: expensesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast({
        title: "Expense added",
        description: "The expense has been recorded.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add expense.",
        variant: "destructive",
      });
    },
  });

  return {
    expenses,
    balance,
    settlements,
    isLoading: isLoadingExpenses || isLoadingBalance || isLoadingSettlements,
    createExpense: createExpenseMutation.mutate,
    isCreating: createExpenseMutation.isPending,
  };
};
