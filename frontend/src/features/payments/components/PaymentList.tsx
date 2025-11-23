import { usePayments } from "@/hooks/usePayments";
import { useHousehold } from "@/hooks/useHousehold";
import { getDisplayName, getMemberById } from "@/lib/display";
import { Card } from "@/components/ui/card";
import { ArrowRight, Banknote } from "lucide-react";
import { PaymentListSkeleton } from "@/components/ui/skeletons";

export function PaymentList() {
  const { payments, isLoading } = usePayments();
  const { household } = useHousehold();

  if (isLoading) {
    return <PaymentListSkeleton />;
  }

  if (!payments?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <Banknote className="h-16 w-16 mb-4 opacity-20" />
        <p className="text-lg font-medium">No payments recorded</p>
        <p className="text-sm mt-1">
          Record payments to settle debts between members.
        </p>
      </div>
    );
  }

  const getMemberName = (id: number) =>
    getDisplayName(getMemberById(household, id));

  return (
    <div className="space-y-4">
      {payments.map((payment) => {
        const fromName =
          getMemberName(payment.fromUserId) ||
          payment.fromUser?.name ||
          payment.fromUser?.email ||
          String(payment.fromUserId);
        const toName =
          getMemberName(payment.toUserId) ||
          payment.toUser?.name ||
          payment.toUser?.email ||
          String(payment.toUserId);
        return (
          <Card
            key={payment.id}
            className="flex flex-row items-center justify-between p-4 hover:shadow-md transition-shadow border-l-4 border-l-green-500/20">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 shrink-0">
                <Banknote className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 font-medium text-base">
                  <span>{fromName}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{toName}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(payment.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600 text-lg">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: household?.currency || "USD",
                }).format(payment.amount)}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Settled
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
