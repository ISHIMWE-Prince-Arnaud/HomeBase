import { PaymentList } from "@/features/payments/components/PaymentList";
import { CreatePaymentDialog } from "@/features/payments/components/CreatePaymentDialog";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Payments
          </h1>
          <p className="text-muted-foreground">
            Record direct payments to settle debts.
          </p>
        </div>
        <CreatePaymentDialog />
      </div>
      <PaymentList />
    </div>
  );
}
