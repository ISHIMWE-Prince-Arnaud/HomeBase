import type { Chore } from "../api";
import { useChores } from "@/hooks/useChores";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2, Calendar, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { EditChoreDialog } from "./EditChoreDialog";

export function ChoreItem({ chore }: { chore: Chore }) {
  const { completeChore, deleteChore, isCompleting, isDeleting } = useChores();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const isOverdue =
    chore.dueDate && new Date(chore.dueDate) < new Date() && !chore.isComplete;

  return (
    <>
      <EditChoreDialog
        chore={chore}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <Card
        className={cn(
          "flex flex-col h-full transition-all hover:shadow-md group",
          chore.isComplete ? "opacity-60 bg-muted/50" : "bg-card"
        )}>
        <CardHeader className="p-4 pb-2 space-y-2">
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1 w-full">
              <div className="flex items-center justify-between w-full gap-2">
                <h3
                  className={cn(
                    "font-semibold leading-tight",
                    chore.isComplete && "line-through text-muted-foreground"
                  )}>
                  {chore.title}
                </h3>
                {isOverdue && (
                  <Badge
                    variant="destructive"
                    className="text-[10px] h-5 px-1.5 shrink-0">
                    Overdue
                  </Badge>
                )}
              </div>

              {chore.dueDate && (
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-xs",
                    isOverdue
                      ? "text-destructive font-medium"
                      : "text-muted-foreground"
                  )}>
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {new Date(chore.dueDate).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2 flex-1">
          {chore.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {chore.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-auto pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {chore.assignedTo ? (
                <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-full">
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    {chore.assignedTo.name?.[0] || "U"}
                  </div>
                  <span>{chore.assignedTo.name}</span>
                </div>
              ) : (
                <span className="italic text-muted-foreground/70">
                  Unassigned
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-3 border-t bg-muted/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => setIsEditOpen(true)}
              disabled={chore.isComplete}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  disabled={isDeleting}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete chore?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{chore.title}"? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteChore(chore.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {!chore.isComplete ? (
            <Button
              variant="default"
              size="sm"
              className="h-8 text-xs bg-primary hover:bg-primary/90 shadow-sm"
              onClick={() => completeChore(chore.id)}
              disabled={isCompleting}>
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Complete
            </Button>
          ) : (
            <Badge
              variant="secondary"
              className="h-8 px-3 bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Done
            </Badge>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
