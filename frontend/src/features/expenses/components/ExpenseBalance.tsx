import { useExpenses } from "@/hooks/useExpenses";
import { useHousehold } from "@/hooks/useHousehold";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function ExpenseBalance() {
  const { balance, settlements, isLoading } = useExpenses();
  const { household } = useHousehold();

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Loading balances...
      </div>
    );
  }

  const getMemberName = (id: number) => {
    const member = household?.members.find((m) => m.id === Number(id));
    return member ? member.name : "Unknown";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: household?.currency || "USD",
    }).format(amount);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Net Balances</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {balance && Object.entries(balance).length > 0 ? (
            Object.entries(balance).map(([userId, amount]) => (
              <div key={userId} className="flex items-center justify-between">
                <span>{getMemberName(Number(userId))}</span>
                <span
                  className={amount >= 0 ? "text-green-600" : "text-red-600"}>
                  {amount >= 0 ? "gets back" : "owes"}{" "}
                  {formatCurrency(Math.abs(amount))}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No balances found.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suggested Settlements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {settlements && settlements.length > 0 ? (
            settlements.map((settlement, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {getMemberName(settlement.fromUserId)}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {getMemberName(settlement.toUserId)}
                  </span>
                </div>
                <span className="font-bold text-primary">
                  {formatCurrency(settlement.amount)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No settlements needed.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
