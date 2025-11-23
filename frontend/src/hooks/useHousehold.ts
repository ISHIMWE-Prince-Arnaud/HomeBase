import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { householdApi } from "@/features/household/api";
import { useNavigate } from "react-router-dom";

export const useHousehold = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: household,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["household", "me"],
    queryFn: householdApi.getMyHousehold,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: false, // Don't retry if 404 (user has no household)
  });

  const createHouseholdMutation = useMutation({
    mutationFn: householdApi.create,
    onSuccess: (data) => {
      queryClient.setQueryData(["household", "me"], data);
    },
  });

  const joinHouseholdMutation = useMutation({
    mutationFn: householdApi.join,
    onSuccess: (data) => {
      queryClient.setQueryData(["household", "me"], data);
    },
  });

  const leaveHouseholdMutation = useMutation({
    mutationFn: householdApi.leave,
    onSuccess: () => {
      queryClient.setQueryData(["household", "me"], null);
      queryClient.invalidateQueries({ queryKey: ["chores"] });
      queryClient.invalidateQueries({ queryKey: ["needs"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      navigate("/dashboard");
    },
  });

  return {
    household,
    isLoading,
    error,
    createHousehold: createHouseholdMutation.mutate,
    isCreating: createHouseholdMutation.isPending,
    joinHousehold: joinHouseholdMutation.mutate,
    isJoining: joinHouseholdMutation.isPending,
    leaveHousehold: leaveHouseholdMutation.mutate,
    isLeaving: leaveHouseholdMutation.isPending,
  };
};
