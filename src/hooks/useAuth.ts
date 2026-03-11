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
      queryClient.removeQueries({ queryKey: ["me"] });

      queryClient.clear();

      localStorage.removeItem("auth-storage");

      navigate("/auth");

      toast.success(data.message || "Logged out successfully");
    },
    onError: (error: Error) => {
      toast.error(`Logout failed: ${error.message}`);
    },
  });
};
