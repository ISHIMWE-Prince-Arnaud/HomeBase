import { useNeeds } from "@/hooks/useNeeds";
import { NeedItem } from "./NeedItem";
import { MarkPurchasedDialog } from "./MarkPurchasedDialog";
import { useState } from "react";
import type { Need } from "../api";

export function NeedList() {
  const { needs, isLoading, error } = useNeeds();
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMarkPurchased = (need: Need) => {
    setSelectedNeed(need);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Loading shopping list...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-destructive">
        Failed to load shopping list.
      </div>
    );
  }

  // Filter out purchased items if we only want to see pending ones?
  // Usually a shopping list shows what you need. Purchased items might disappear or go to history.
  // For now, let's show all but maybe sort pending first.
  // Actually, let's filter to show only pending items for the main list to keep it clean.
  const pendingNeeds = needs?.filter((n) => !n.isPurchased) || [];

  if (!pendingNeeds.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
        <p>All caught up!</p>
        <p className="text-sm">Add items to your shopping list.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pendingNeeds.map((need) => (
          <NeedItem
            key={need.id}
            need={need}
            onMarkPurchased={handleMarkPurchased}
          />
        ))}
      </div>
      <MarkPurchasedDialog
        need={selectedNeed}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
