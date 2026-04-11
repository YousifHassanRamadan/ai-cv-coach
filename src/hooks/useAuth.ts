import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  logout,
  registerUser,
  SignInUser,
  type RegisterPayload,
  type RegisterResponse,
  type SignInPayload,
  type SignInResponse,
} from "../api/auth";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth";

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: registerUser,
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation<SignInResponse, Error, SignInPayload>({
    mutationFn: SignInUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });

      toast.success("Logged in successfully");
    },
  });
};

export const useLogout = (navigate: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      useAuthStore.getState().clearTokens();

      localStorage.clear();

      queryClient.clear();

      navigate("/auth");

      queryClient.removeQueries({ queryKey: ["me"] });

      toast.success(data.message || "Logged out successfully");
    },
    onError: (error: Error) => {
      toast.error(`Logout failed: ${error.message}`);
    },
  });
};
