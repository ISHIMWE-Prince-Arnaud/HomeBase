import type { Notification } from "../api";
import { cn } from "@/lib/utils";
import { Bell, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: number) => void;
}

export function NotificationItem({
  notification,
  onMarkRead,
}: NotificationItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-lg border p-4 transition-colors",
        notification.isRead ? "bg-background" : "bg-muted/50 border-primary/20"
      )}>
      <div
        className={cn(
          "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          notification.isRead
            ? "bg-muted text-muted-foreground"
            : "bg-primary/10 text-primary"
        )}>
        <Bell className="h-4 w-4" />
      </div>
      <div className="flex-1 space-y-1">
        <p
          className={cn(
            "text-sm font-medium leading-none",
            !notification.isRead && "font-semibold"
          )}>
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(notification.createdAt).toLocaleString()}
        </p>
      </div>
      {!notification.isRead && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-muted-foreground hover:text-primary"
          onClick={() => onMarkRead(notification.id)}
          title="Mark as read">
          <CheckCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
