import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckSquare,
  ShoppingBag,
  Receipt,
  Menu,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Chores", href: "/chores", icon: CheckSquare },
  { label: "Needs", href: "/needs", icon: ShoppingBag },
  { label: "Expenses", href: "/expenses", icon: Receipt },
  { label: "Menu", href: "/profile", icon: Menu }, // Menu acts as "More"
];

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background px-4 md:hidden">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={cn(
            "flex flex-col items-center gap-1 text-xs font-medium transition-colors hover:text-primary",
            location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
      ))}
    </div>
  );
}
