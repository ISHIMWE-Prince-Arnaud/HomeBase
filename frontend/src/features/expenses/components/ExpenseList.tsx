import { useExpenses } from "@/hooks/useExpenses";
import { useHousehold } from "@/hooks/useHousehold";
import { Card } from "@/components/ui/card";
import { Receipt } from "lucide-react";
import { ExpenseListSkeleton } from "@/components/ui/skeletons";

export function ExpenseList() {
  const { expenses, isLoading } = useExpenses();
  const { household } = useHousehold();

  if (isLoading) {
    return <ExpenseListSkeleton />;
  }

  if (!expenses?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
        <Receipt className="h-12 w-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">No expenses recorded</p>
        <p className="text-sm mt-1">
          Start tracking shared expenses by adding your first expense.
        </p>
      </div>
    );
  }

  const getMemberName = (id: number) => {
    return household?.members.find((m) => m.id === id)?.name;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: household?.currency || "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {expenses.map((expense) => {
        const participantCount = expense.participants?.length || 0;
        const shareAmount =
          participantCount > 0 ? expense.totalAmount / participantCount : 0;

        return (
          <Card
            key={expense.id}
            className="flex flex-col gap-3 p-4 hover:shadow-md transition-shadow border-l-4 border-l-primary/20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <Receipt className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base leading-tight truncate">
                    {expense.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/80">
                      {getMemberName(expense.paidById) ||
                        expense.paidBy?.name ||
                        expense.paidBy?.email}
                    </span>
                    <span>paid</span>
                    {expense.date && (
                      <>
                        <span className="text-muted-foreground/40">•</span>
                        <span>
                          {new Date(expense.date).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-base text-primary">
                  {formatCurrency(expense.totalAmount)}
                </p>
                {participantCount > 1 && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {formatCurrency(shareAmount)} / person
                  </p>
                )}
              </div>
            </div>

            {expense.participants && expense.participants.length > 0 && (
              <div className="bg-muted/30 rounded-md p-2 mt-1">
                <div className="flex flex-wrap gap-1.5">
                  {expense.participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center gap-1.5 rounded-full bg-background border px-2 py-0.5 shadow-sm"
                      title={`${getMemberName(
                        participant.userId
                      )} owes ${formatCurrency(participant.shareAmount)}`}>
                      <span className="text-[10px] font-medium">
                        {getMemberName(participant.userId)?.split(" ")[0] ||
                          participant.user?.name?.split(" ")[0] ||
                          "User"}
                      </span>
                    </div>
                  ))}
                  <span className="text-[10px] text-muted-foreground flex items-center px-1">
                    split by {participantCount}
                  </span>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
