import type { Need } from "../api";
import { useNeeds } from "@/hooks/useNeeds";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Trash2, Edit2, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UpdateNeedDialog } from "./UpdateNeedDialog";

interface NeedItemProps {
  need: Need;
  onMarkPurchased: (need: Need) => void;
}

export function NeedItem({ need, onMarkPurchased }: NeedItemProps) {
  const { deleteNeed, isDeleting } = useNeeds();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const isPurchased = need.isPurchased;

  const handleDelete = () => {
    deleteNeed(need.id, {
      onSuccess: () => setShowDeleteDialog(false),
    });
  };

  return (
    <>
      <Card
        className={cn(
          "transition-all border rounded-xl shadow-sm hover:shadow-md",
          "flex flex-col",
          isPurchased &&
            "bg-green-50/40 border-green-200 opacity-80 hover:shadow-none"
        )}>
        {/* Header */}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "text-lg font-semibold tracking-tight",
                  isPurchased && "line-through text-muted-foreground"
                )}>
                {need.name}
              </h3>

              {/* Category under title on mobile, badge on right for desktop */}
              {need.category && (
                <div className="mt-1 text-sm text-muted-foreground sm:hidden">
                  {need.category}
                </div>
              )}
            </div>

            {need.category && (
              <Badge
                variant="secondary"
                className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium">
                {need.category}
              </Badge>
            )}
          </div>
        </CardHeader>

        {/* Middle info section */}
        {(need.quantity || need.category) && (
          <CardContent className="pt-0 pb-2">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {need.quantity && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Qty:</span>
                  <span>{need.quantity}</span>
                </div>
              )}
            </div>
          </CardContent>
        )}

        {/* Footer / actions */}
        <CardFooter className="flex items-center justify-between pt-2 mt-auto">
          <Button
            variant={isPurchased ? "secondary" : "default"}
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full transition-all shrink-0",
              "hover:scale-105",
              isPurchased &&
                "bg-green-100 text-green-700 hover:bg-green-200 hover:scale-100"
            )}
            onClick={() => onMarkPurchased(need)}
            disabled={isPurchased}
            title={isPurchased ? "Already purchased" : "Mark as purchased"}>
            {isPurchased ? (
              <Check className="h-5 w-5" />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
          </Button>

          {!isPurchased && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => setShowEditDialog(true)}
                title="Edit item">
                <Edit2 className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
                title="Delete item">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      {/* Delete dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{need.name}</strong> from
              the shopping list? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpdateNeedDialog
        need={need}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}
