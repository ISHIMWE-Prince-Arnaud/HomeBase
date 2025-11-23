import { useExpenses } from "@/hooks/useExpenses";
import { useHousehold } from "@/hooks/useHousehold";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function ExpenseBalance() {
  const { balance, settlements, settlementsScale, isLoading } = useExpenses();
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

  // Sort balance by net amount (highest owed first, then highest owes)
  const sortedBalance = balance
    ? [...balance].sort((a, b) => b.net - a.net)
    : [];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Net Balances</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedBalance.length > 0 ? (
            sortedBalance.map((item) => (
              <div
                key={item.userId}
                className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      item.net >= 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    <span className="text-sm font-bold">
                      {item.net >= 0 ? "+" : ""}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {item.name || getMemberName(item.userId)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.email || "Member"}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-bold ${
                    item.net >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                  {item.net >= 0 ? "gets back" : "owes"}{" "}
                  {formatCurrency(Math.abs(item.net))}
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
            settlements.map((settlement, index) => {
              // Divide by scale to get display amount
              const displayAmount = settlement.amount / settlementsScale;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {settlement.fromName ||
                        getMemberName(settlement.fromUserId)}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {settlement.toName || getMemberName(settlement.toUserId)}
                    </span>
                  </div>
                  <span className="font-bold text-primary">
                    {formatCurrency(displayAmount)}
                  </span>
                </div>
              );
            })
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
