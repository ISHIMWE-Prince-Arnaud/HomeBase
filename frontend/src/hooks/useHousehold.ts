import { useQuery } from "@tanstack/react-query";
import { householdApi } from "@/features/household/api";

export const useHousehold = () => {
  const {
    data: household,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["household", "me"],
    queryFn: householdApi.getMyHousehold,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return {
    household,
    isLoading,
    error,
  };
};
