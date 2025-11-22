import { useChores } from "@/hooks/useChores";
import { ChoreItem } from "./ChoreItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Chore } from "../api";

export function ChoreList() {
  const { chores, isLoading, error } = useChores();

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Loading chores...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-destructive">
        Failed to load chores.
      </div>
    );
  }

  if (!chores?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
        <p>No chores found.</p>
        <p className="text-sm">Create one to get started!</p>
      </div>
    );
  }

  const activeCount = chores.filter((c) => !c.isComplete).length;
  const completedCount = chores.filter((c) => c.isComplete).length;

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All ({chores.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCount})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <ChoreGrid chores={chores} />
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          <ChoreGrid chores={chores.filter((c) => !c.isComplete)} />
        </TabsContent>
        <TabsContent value="completed" className="mt-0">
          <ChoreGrid chores={chores.filter((c) => c.isComplete)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChoreGrid({ chores }: { chores: Chore[] }) {
  if (chores.length === 0) {
    return (
      <div className="py-10 text-center text-muted-foreground border rounded-lg border-dashed">
        No chores in this list.
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {chores.map((chore) => (
        <ChoreItem key={chore.id} chore={chore} />
      ))}
    </div>
  );
}
