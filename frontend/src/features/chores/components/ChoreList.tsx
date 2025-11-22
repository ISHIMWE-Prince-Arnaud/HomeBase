import { useChores } from "@/hooks/useChores";
import { ChoreItem } from "./ChoreItem";
// I haven't installed skeleton. I'll use a simple div for loading or install it.
// Let's install skeleton quickly in the next step if I can, or just use text.
// I'll use text "Loading..." for now to save a step, or just a spinner.

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

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {chores.map((chore) => (
        <ChoreItem key={chore.id} chore={chore} />
      ))}
    </div>
  );
}
