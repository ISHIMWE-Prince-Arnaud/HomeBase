import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckSquare,
  ShoppingBag,
  Receipt,
  CreditCard,
  Bell,
  Home,
  User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Chores", href: "/chores", icon: CheckSquare },
  { label: "Needs", href: "/needs", icon: ShoppingBag },
  { label: "Expenses", href: "/expenses", icon: Receipt },
  { label: "Payments", href: "/payments", icon: CreditCard },
];

const secondaryItems = [
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Household", href: "/household", icon: Home },
  { label: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden h-screen w-64 flex-col border-r bg-card text-card-foreground md:flex">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-primary">
          <Home className="h-6 w-6" />
          <span>HomeBase</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
            Menu
          </div>
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                location.pathname === item.href
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <div className="mt-4 px-2 py-1 text-xs font-semibold text-muted-foreground">
            Settings
          </div>
          {secondaryItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                location.pathname === item.href
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
