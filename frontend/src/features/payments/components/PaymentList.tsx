import { usePayments } from "@/hooks/usePayments";
import { useHousehold } from "@/hooks/useHousehold";
import { Card } from "@/components/ui/card";
import { ArrowRight, Banknote } from "lucide-react";

export function PaymentList() {
  const { payments, isLoading } = usePayments();
  const { household } = useHousehold();

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Loading payments...
      </div>
    );
  }

  if (!payments?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
        <p>No payments recorded.</p>
      </div>
    );
  }

  const getMemberName = (id: number) => {
    const member = household?.members.find((m) => m.id === id);
    return member ? member.name : "Unknown";
  };

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <Card
          key={payment.id}
          className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Banknote className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-medium">
                <span>{getMemberName(payment.fromUserId)}</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <span>{getMemberName(payment.toUserId)}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(payment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-600">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: household?.currency || "USD",
              }).format(payment.amount)}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
