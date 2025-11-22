import { useNeeds } from "@/hooks/useNeeds";
import { NeedItem } from "./NeedItem";
import { MarkPurchasedDialog } from "./MarkPurchasedDialog";
import { useState } from "react";
import type { Need } from "../api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function NeedList() {
  const { needs, isLoading, error } = useNeeds();
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState<"pending" | "purchased" | "all">("pending");

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

  // Filter needs based on search and purchase status
  const filteredNeeds = (needs || []).filter((need) => {
    const matchesSearch =
      !searchQuery ||
      need.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      need.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const pendingNeeds = filteredNeeds.filter((n) => !n.isPurchased);
  const purchasedNeeds = filteredNeeds.filter((n) => n.isPurchased);

  const combinedNeeds = [...pendingNeeds, ...purchasedNeeds];
  const currentList =
    tab === "pending"
      ? pendingNeeds
      : tab === "purchased"
      ? purchasedNeeds
      : combinedNeeds;
  const hasNoResults = currentList.length === 0 && searchQuery;

  return (
    <>
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs for All/Pending/Purchased */}
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "pending" | "purchased" | "all")}>
          <TabsList>
            <TabsTrigger value="all">All ({combinedNeeds.length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingNeeds.length})
            </TabsTrigger>
            <TabsTrigger value="purchased">
              Purchased ({purchasedNeeds.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            {hasNoResults ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                <p>No items found matching "{searchQuery}"</p>
                <p className="text-sm">Try a different search term.</p>
              </div>
            ) : pendingNeeds.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                <p className="text-lg font-medium">All caught up!</p>
                <p className="text-sm">Add items to your shopping list.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pendingNeeds.map((need) => (
                  <NeedItem
                    key={need.id}
                    need={need}
                    onMarkPurchased={handleMarkPurchased}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="purchased" className="mt-4">
            {hasNoResults ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                <p>No purchased items found matching "{searchQuery}"</p>
                <p className="text-sm">Try a different search term.</p>
              </div>
            ) : purchasedNeeds.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                <p className="text-lg font-medium">No purchased items yet</p>
                <p className="text-sm">
                  Items you mark as purchased will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {purchasedNeeds.map((need) => (
                  <NeedItem
                    key={need.id}
                    need={need}
                    onMarkPurchased={handleMarkPurchased}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            {hasNoResults ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                <p>No items found matching "{searchQuery}"</p>
                <p className="text-sm">Try a different search term.</p>
              </div>
            ) : combinedNeeds.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                <p className="text-lg font-medium">No items yet</p>
                <p className="text-sm">Add items to your shopping list.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {combinedNeeds.map((need) => (
                  <NeedItem
                    key={need.id}
                    need={need}
                    onMarkPurchased={handleMarkPurchased}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <MarkPurchasedDialog
        need={selectedNeed}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
