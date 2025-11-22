import { NotificationList } from "@/features/notifications/components/NotificationList";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Notifications
        </h1>
        <p className="text-muted-foreground">
          Stay updated with what's happening in your household.
        </p>
      </div>
      <NotificationList />
    </div>
  );
}
