import type { Chore } from "../api";
import { useChores } from "@/hooks/useChores";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2, Calendar, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export function ChoreItem({ chore }: { chore: Chore }) {
  const { completeChore, deleteChore, isCompleting, isDeleting } = useChores();

  const isOverdue =
    chore.dueDate && new Date(chore.dueDate) < new Date() && !chore.isComplete;

  return (
    <Card
      className={cn(
        "flex flex-col h-full transition-all hover:shadow-md border-l-4",
        chore.isComplete
          ? "border-l-green-500 opacity-75 bg-muted/30"
          : isOverdue
          ? "border-l-destructive"
          : "border-l-primary"
      )}>
      <CardHeader className="p-4 pb-2 space-y-0">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  "font-semibold leading-none tracking-tight",
                  chore.isComplete && "line-through text-muted-foreground"
                )}>
                {chore.title}
              </h3>
              {isOverdue && (
                <Badge variant="destructive" className="text-[10px] h-5 px-1.5">
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
                  {" • "}
                  {new Date(chore.dueDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Assignee Avatar - Top Right */}
          {chore.assignedTo ? (
            <div
              className="flex flex-col items-end"
              title={`Assigned to ${chore.assignedTo.name}`}>
              <Avatar className="h-8 w-8 border-2 border-background shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {chore.assignedTo.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground mt-1 max-w-[60px] truncate">
                {chore.assignedTo.name}
              </span>
            </div>
          ) : (
            <div
              className="flex flex-col items-end opacity-50"
              title="Unassigned">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-[10px] text-muted-foreground mt-1">
                Unassigned
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-1">
        {chore.description ? (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {chore.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground/50 italic">
            No description provided.
          </p>
        )}
      </CardContent>

      <CardFooter className="p-3 bg-muted/20 flex gap-2 items-center justify-between">
        {/* Delete Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive h-8 px-2"
              disabled={isDeleting}>
              <Trash2 className="h-4 w-4 mr-1" />
              <span className="text-xs">Delete</span>
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

        {/* Complete Button */}
        {!chore.isComplete ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 shadow-sm"
                disabled={isCompleting}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Mark as complete?</AlertDialogTitle>
                <AlertDialogDescription>
                  Confirm that you have completed "{chore.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => completeChore(chore.id)}>
                  Yes, Complete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            className="bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 h-8 cursor-default"
            disabled>
            <CheckCircle className="h-4 w-4 mr-2" />
            Completed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
