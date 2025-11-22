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
        <p>No expenses recorded.</p>
      </div>
    );
  }

  const getMemberName = (id: number) => {
    const member = household?.members.find((m) => m.id === id);
    return member ? `${member.firstName} ${member.lastName}` : "Unknown";
  };

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <Card
          key={expense.id}
          className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Receipt className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">{expense.description}</p>
              <p className="text-sm text-muted-foreground">
                Paid by {getMemberName(expense.paidById)} •{" "}
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-primary">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: household?.currency || "USD",
              }).format(expense.totalAmount)}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
