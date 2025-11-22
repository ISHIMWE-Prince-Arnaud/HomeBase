import { NeedList } from "@/features/needs/components/NeedList";
import { CreateNeedDialog } from "@/features/needs/components/CreateNeedDialog";

export default function NeedsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Shopping List
          </h1>
          <p className="text-muted-foreground">
            Track items needed for the household.
          </p>
        </div>
        <CreateNeedDialog />
      </div>
      <NeedList />
    </div>
  );
}
