import { useNotifications } from "@/hooks/useNotifications";
import { NotificationItem } from "./NotificationItem";
import { Button } from "@/components/ui/button";
import { CheckCheck, Bell } from "lucide-react";
import { NotificationListSkeleton } from "@/components/ui/skeletons";

export function NotificationList() {
  const { notifications, isLoading, markRead, markAllRead, isMarkingRead } =
    useNotifications();

  if (isLoading) {
    return <NotificationListSkeleton />;
  }

  if (!notifications?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <Bell className="h-16 w-16 mb-4 opacity-20" />
        <p className="text-lg font-medium">No notifications</p>
        <p className="text-sm mt-1">You're all caught up!</p>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-4">
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAllRead()}
            disabled={isMarkingRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      )}
      <div className="space-y-2">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkRead={markRead}
          />
        ))}
      </div>
    </div>
  );
}
