import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  SignInUser,
  type RegisterPayload,
  type RegisterResponse,
  type SignInPayload,
  type SignInResponse,
} from "../api/auth";

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: registerUser,
  });
};

export const useSignIn = () => {
  return useMutation<SignInResponse, Error, SignInPayload>({
    mutationFn: SignInUser,
  });
};
