import type { Need } from "../api";
import { useNeeds } from "@/hooks/useNeeds";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NeedItemProps {
  need: Need;
  onMarkPurchased: (need: Need) => void;
}

export function NeedItem({ need, onMarkPurchased }: NeedItemProps) {
  const { deleteNeed, isDeleting } = useNeeds();

  const isPurchased = need.isPurchased;

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        isPurchased && "opacity-60 bg-muted/50"
      )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center gap-3">
          <Button
            variant={isPurchased ? "secondary" : "outline"}
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full",
              isPurchased && "text-green-600"
            )}
            onClick={() => onMarkPurchased(need)}
            disabled={isPurchased}
            title="Mark as purchased">
            <Check className="h-4 w-4" />
          </Button>
          <div className="flex flex-col">
            <CardTitle
              className={cn(
                "text-base font-medium",
                isPurchased && "line-through"
              )}>
              {need.name}
            </CardTitle>
            {need.quantity && (
              <div className="text-xs text-muted-foreground">
                Qty: {need.quantity}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {need.category && (
            <Badge variant="outline" className="text-xs font-normal">
              {need.category}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteNeed(need.id)}
            disabled={isDeleting}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
