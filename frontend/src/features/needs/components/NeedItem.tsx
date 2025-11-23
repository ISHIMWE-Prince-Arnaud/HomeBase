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
          "transition-all border rounded-xl shadow-sm hover:shadow-md group relative overflow-hidden",
          "flex flex-col h-full",
          isPurchased && "bg-muted/30 opacity-60"
        )}>
        {isPurchased && (
          <div className="absolute inset-0 bg-background/50 z-10 pointer-events-none" />
        )}

        <CardHeader className="p-4 pb-2 space-y-1 z-20">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "font-semibold leading-tight break-words",
                  isPurchased && "line-through text-muted-foreground"
                )}>
                {need.name}
              </h3>
            </div>
            {need.category && (
              <Badge
                variant="outline"
                className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-medium shrink-0 bg-background">
                {need.category}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex-1 z-20">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
            {need.quantity && (
              <Badge
                variant="secondary"
                className="px-1.5 py-0 h-5 font-normal">
                Qty: {need.quantity}
              </Badge>
            )}
            {need.category && (
              <span className="sm:hidden inline-block bg-muted px-1.5 rounded text-[10px]">
                {need.category}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-3 border-t bg-muted/10 flex items-center justify-between gap-2 z-20 mt-auto">
          <div className="flex items-center gap-1">
            {!isPurchased && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                  onClick={() => setShowEditDialog(true)}
                  title="Edit item">
                  <Edit2 className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={isDeleting}
                  title="Delete item">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </>
            )}
            {isPurchased && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive z-30 pointer-events-auto"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
                title="Delete item">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </div>

          <Button
            variant={isPurchased ? "secondary" : "default"}
            size="sm"
            className={cn(
              "h-8 text-xs shadow-sm z-30 pointer-events-auto",
              isPurchased
                ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 cursor-default"
                : "bg-primary hover:bg-primary/90"
            )}
            onClick={() => !isPurchased && onMarkPurchased(need)}
            disabled={isPurchased}
            title={isPurchased ? "Purchased" : "Mark as purchased"}>
            {isPurchased ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1.5" />
                Purchased
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                Buy
              </>
            )}
          </Button>
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
