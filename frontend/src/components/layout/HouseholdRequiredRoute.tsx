import { useHousehold } from "@/hooks/useHousehold";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function HouseholdRequiredRoute() {
  const { household, isLoading } = useHousehold();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!household) {
    return (
      <Navigate
        to="/household"
        state={{ from: location, reason: "noHousehold" }}
        replace
      />
    );
  }

  return <Outlet />;
}
