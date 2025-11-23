import { useChores } from "@/hooks/useChores";
import { useNeeds } from "@/hooks/useNeeds";
import { useExpenses } from "@/hooks/useExpenses";
import { useNotifications } from "@/hooks/useNotifications";
import { useHousehold } from "@/hooks/useHousehold";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckSquare,
  ShoppingBag,
  Receipt,
  Bell,
  ArrowRight,
  CreditCard,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useAuth();
  const { household } = useHousehold();
  const { chores, isLoading: isLoadingChores } = useChores();
  const { needs, isLoading: isLoadingNeeds } = useNeeds();
  const { balance, isLoading: isLoadingExpenses } = useExpenses();
  const { notifications, isLoading: isLoadingNotifications } =
    useNotifications();

  const isLoading =
    isLoadingChores ||
    isLoadingNeeds ||
    isLoadingExpenses ||
    isLoadingNotifications;

  if (!user || !household) return null;

  // Summaries
  const pendingChores = chores?.filter((c) => !c.isComplete).length || 0;
  const myPendingChores =
    chores?.filter((c) => !c.isComplete && c.assignedToId === user.id).length ||
    0;
  const activeNeeds = needs?.filter((n) => !n.isPurchased).length || 0;
  const unreadNotifications =
    notifications?.filter((n) => !n.isRead).length || 0;

  // Calculate balance - find user's balance from array
  const myBalanceItem = balance?.find((b) => b.userId === user.id);
  const myBalance = myBalanceItem?.net || 0;
  const balanceColor =
    myBalance > 0
      ? "text-green-600"
      : myBalance < 0
      ? "text-red-600"
      : "text-muted-foreground";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name.split(" ")[0]}! Here's what's happening in{" "}
          {household.name}.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Chores
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{pendingChores}</div>
            )}
            <p className="text-xs text-muted-foreground">
              {myPendingChores} assigned to you
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shopping List</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{activeNeeds}</div>
            )}
            <p className="text-xs text-muted-foreground">Items to buy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className={`text-2xl font-bold ${balanceColor}`}>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: household.currency || "USD",
                }).format(Math.abs(myBalance))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {myBalance >= 0 ? "You are owed" : "You owe"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{unreadNotifications}</div>
            )}
            <p className="text-xs text-muted-foreground">Unread updates</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        {/* Quick Actions / Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Button
              variant="outline"
              className="h-24 flex-col items-center justify-center space-y-2"
              asChild>
              <Link to="/chores">
                <CheckSquare className="h-6 w-6" />
                <span>View Chores</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col items-center justify-center space-y-2"
              asChild>
              <Link to="/needs">
                <ShoppingBag className="h-6 w-6" />
                <span>Shopping List</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col items-center justify-center space-y-2"
              asChild>
              <Link to="/expenses">
                <CreditCard className="h-6 w-6" />
                <span>Add Expense</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col items-center justify-center space-y-2"
              asChild>
              <Link to="/household">
                <Users className="h-6 w-6" />
                <span>Manage Household</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Household Preview */}
        <Card className="col-span-4 flex flex-col border shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              Household
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Household Info */}
            <div className="flex items-center justify-between rounded-md bg-muted/40 p-4">
              <div>
                <p className="text-base font-semibold">{household.name}</p>
                <p className="text-sm text-muted-foreground">
                  {household.members.length}{" "}
                  {household.members.length === 1 ? "member" : "members"}
                </p>
              </div>
            </div>

            {/* Members List */}
            <div className="space-y-3">
              {household.members.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={member.profileImage}
                        alt={member.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{member.name}</span>
                  </div>
                </div>
              ))}

              {household.members.length > 3 && (
                <p className="text-xs text-muted-foreground text-center pt-1">
                  +{household.members.length - 3} more members
                </p>
              )}
            </div>

            {/* Button */}
            <Button variant="outline" className="w-full group" asChild>
              <Link
                to="/household"
                className="flex items-center justify-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
