import { useChores } from "@/hooks/useChores";
import { ChoreItem } from "./ChoreItem";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ChoreListSkeleton } from "@/components/ui/skeletons";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function ChoreList() {
  const { chores, isLoading, error } = useChores();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

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

  const filteredChores = chores?.filter((chore) => {
    if (filter === "active") return !chore.isComplete;
    if (filter === "completed") return chore.isComplete;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs
          defaultValue="all"
          value={filter}
          onValueChange={(v) => setFilter(v as any)}
          className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredChores?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <p className="text-lg font-medium">No chores found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredChores?.map((chore) => (
            <StaggerItem key={chore.id}>
              <ChoreItem chore={chore} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
