import { useExpenses } from "@/hooks/useExpenses";
import { useHousehold } from "@/hooks/useHousehold";
import { Card } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export function ExpenseList() {
  const { expenses, isLoading } = useExpenses();
  const { household } = useHousehold();

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Loading expenses...
      </div>
    );
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
    const member = household?.members.find((m) => m.id === id);
    return member ? member.name : "Unknown";
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
            className="flex flex-col gap-4 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <Receipt className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg">{expense.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span>Paid by {getMemberName(expense.paidById)}</span>
                    {expense.date && (
                      <>
                        <span>•</span>
                        <span>
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                      </>
                    )}
                    {participantCount > 0 && (
                      <>
                        <span>•</span>
                        <span>
                          Split among {participantCount}{" "}
                          {participantCount === 1 ? "person" : "people"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-lg text-primary">
                  {formatCurrency(expense.totalAmount)}
                </p>
                {participantCount > 1 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(shareAmount)} each
                  </p>
                )}
              </div>
            </div>
            {expense.participants && expense.participants.length > 0 && (
              <div className="border-t pt-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Participants:
                </p>
                <div className="flex flex-wrap gap-2">
                  {expense.participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center gap-2 rounded-md bg-muted px-2 py-1">
                      <span className="text-xs font-medium">
                        {getMemberName(participant.userId)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatCurrency(participant.shareAmount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
