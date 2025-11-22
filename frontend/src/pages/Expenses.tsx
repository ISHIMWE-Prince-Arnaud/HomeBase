import { ExpenseList } from "@/features/expenses/components/ExpenseList";
import { ExpenseBalance } from "@/features/expenses/components/ExpenseBalance";
import { CreateExpenseDialog } from "@/features/expenses/components/CreateExpenseDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Expenses
          </h1>
          <p className="text-muted-foreground">
            Track shared expenses and settle up.
          </p>
        </div>
        <CreateExpenseDialog />
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
        </TabsList>
        <TabsContent value="history" className="mt-4">
          <ExpenseList />
        </TabsContent>
        <TabsContent value="balances" className="mt-4">
          <ExpenseBalance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
