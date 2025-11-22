import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { householdApi } from "@/features/household/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useHousehold = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
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
      toast({
        title: "Household created",
        description: `Welcome to ${data.name}!`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create household.",
        variant: "destructive",
      });
    },
  });

  const joinHouseholdMutation = useMutation({
    mutationFn: householdApi.join,
    onSuccess: (data) => {
      queryClient.setQueryData(["household", "me"], data);
      toast({
        title: "Joined household",
        description: `You are now a member of ${data.name}.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to join household. Check the invite code.",
        variant: "destructive",
      });
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
      toast({
        title: "Left household",
        description: "You have left the household.",
      });
      navigate("/dashboard");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to leave household.",
        variant: "destructive",
      });
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
