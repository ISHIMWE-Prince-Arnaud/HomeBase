import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  ShoppingBag,
  Receipt,
  Menu,
  CreditCard,
  Bell,
  Home,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export function BottomNav() {
  const location = useLocation();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const tabs = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Chores", href: "/chores", icon: CheckSquare },
    { name: "Needs", href: "/needs", icon: ShoppingBag },
    { name: "Expenses", href: "/expenses", icon: Receipt },
  ];

  const menuItems = [
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Household", href: "/household", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
        <div className="flex h-16 items-center justify-around px-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href;
            return (
              <Link
                key={tab.href}
                to={tab.href}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </Link>
            );
          })}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors hover:text-primary text-muted-foreground"
                )}>
                <Menu className="h-5 w-5" />
                <span>Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={
                      location.pathname === item.href ? "secondary" : "ghost"
                    }
                    className="w-full justify-start"
                    asChild
                    onClick={() => setOpen(false)}>
                    <Link to={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </Button>
                ))}
                <div className="my-2 border-t" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    setOpen(false);
                    setShowLogoutDialog(true);
                  }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You'll need to sign in again to
              access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-white" onClick={() => logout()}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
