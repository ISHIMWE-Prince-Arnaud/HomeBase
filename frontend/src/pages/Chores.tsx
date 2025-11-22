import { ChoreList } from "@/features/chores/components/ChoreList";
import { CreateChoreDialog } from "@/features/chores/components/CreateChoreDialog";

export default function ChoresPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Chores
          </h1>
          <p className="text-muted-foreground">
            Manage and track household chores.
          </p>
        </div>
        <CreateChoreDialog />
      </div>
      <ChoreList />
    </div>
  );
}
