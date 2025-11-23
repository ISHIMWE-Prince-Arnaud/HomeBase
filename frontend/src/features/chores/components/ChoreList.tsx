import { useChores } from "@/hooks/useChores";
import { ChoreItem } from "./ChoreItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Chore } from "../api";
import { ChoreListSkeleton } from "@/components/ui/skeletons";
import { CheckSquare } from "lucide-react";

export function ChoreList() {
  const { chores, isLoading, error } = useChores();

  if (isLoading) {
    return <ChoreListSkeleton />;
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
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <CheckSquare className="h-16 w-16 mb-4 opacity-20" />
        <p className="text-lg font-medium">No chores found</p>
        <p className="text-sm mt-1">Create one to get started!</p>
      </div>
    );
  }

  const activeCount = chores.filter((c) => !c.isComplete).length;
  const completedCount = chores.filter((c) => c.isComplete).length;

  // Sort chores: incomplete first, then completed
  const sortedChores = [...chores].sort((a, b) => {
    if (a.isComplete === b.isComplete) return 0;
    return a.isComplete ? 1 : -1;
  });

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
          <ChoreGrid chores={sortedChores} />
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
