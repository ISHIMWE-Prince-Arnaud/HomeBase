import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api";
import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: authApi.getProfile,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data.user);
      toast.success("Welcome back!", `Logged in as ${data.user.name}`);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Login failed", "Please check your credentials.");
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data.user);
      toast.success("Welcome!", "Account created successfully.");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Registration failed", "Please try again.");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      queryClient.clear(); // Clear all cache
      navigate("/login");
      toast.success("Logged out", "See you soon!");
    },
    onError: () => {
      toast.error("Error", "Failed to logout.");
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data);
      toast.success(
        "Profile updated",
        "Your profile has been successfully updated."
      );
    },
    onError: () => {
      toast.error("Error", "Failed to update profile. Check your password.");
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout: logoutMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
  };
};
