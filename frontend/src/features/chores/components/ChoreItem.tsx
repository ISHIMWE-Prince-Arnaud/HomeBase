import type { Chore } from "../api";
import { useChores } from "@/hooks/useChores";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
// I haven't installed date-fns explicitly. I'll use native date formatting for now to avoid error.

export function ChoreItem({ chore }: { chore: Chore }) {
  const { completeChore, deleteChore, isCompleting, isDeleting } = useChores();

  const isOverdue =
    chore.dueDate && new Date(chore.dueDate) < new Date() && !chore.isComplete;

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        chore.isComplete && "opacity-60"
      )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 rounded-full",
              chore.isComplete ? "text-green-500" : "text-muted-foreground"
            )}
            onClick={() => completeChore(chore.id)}
            disabled={isCompleting || chore.isComplete}>
            {chore.isComplete ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </Button>
          <div className="flex flex-col">
            <CardTitle
              className={cn(
                "text-base font-medium",
                chore.isComplete && "line-through"
              )}>
              {chore.title}
            </CardTitle>
            {chore.dueDate && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs",
                  isOverdue ? "text-red-500" : "text-muted-foreground"
                )}>
                <Calendar className="h-3 w-3" />
                {new Date(chore.dueDate).toLocaleDateString()}{" "}
                {new Date(chore.dueDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => deleteChore(chore.id)}
          disabled={isDeleting}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      {chore.description && (
        <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
          {chore.description}
        </CardContent>
      )}
    </Card>
  );
}
