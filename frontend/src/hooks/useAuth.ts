import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/lib/toast";

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
      showToast.success(`Welcome back, ${data.user.name}! 👋`);
      navigate("/dashboard");
    },
    onError: () => {
      showToast.error(
        "Login failed",
        "Please check your credentials and try again."
      );
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data.user);
      showToast.success(
        "Account created successfully! 🎉",
        `Welcome, ${data.user.name}!`
      );
      navigate("/dashboard");
    },
    onError: () => {
      showToast.error(
        "Registration failed",
        "Please check your information and try again."
      );
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      queryClient.clear(); // Clear all cache
      showToast.success("Logged out successfully", "See you soon!");
      navigate("/login");
    },
    onError: () => {
      showToast.error("Logout failed", "Please try again.");
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data);
      showToast.success("Profile updated ✓", "Your changes have been saved.");
    },
    onError: () => {
      showToast.error(
        "Update failed",
        "Please check your password and try again."
      );
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
