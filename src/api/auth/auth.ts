import { useAuthStore } from "../../store/auth";
import { api } from "../../utils/axios";
import type {
  RefreshResponse,
  RegisterPayload,
  RegisterResponse,
  SignInPayload,
  SignInResponse,
} from "./auth.types";

export const registerUser = async (
  data: RegisterPayload,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/auth/register", data);
  return response.data;
};

export const SignInUser = async (
  data: SignInPayload,
): Promise<SignInResponse> => {
  const response = await api.post<SignInResponse>("/auth/login", data);

  // ✅ SAVE TOKENS TO ZUSTAND AFTER LOGIN
  useAuthStore
    .getState()
    .setTokens(response.data.token, response.data.refreshToken);

  return response.data;
};

export const refreshToken = async (): Promise<RefreshResponse> => {
  const refreshTokenData = useAuthStore.getState().refreshToken;

  if (!refreshTokenData) {
    throw new Error("No refresh token available");
  }

  const res = await api.post<RefreshResponse>("/auth/refresh", {
    refreshToken: refreshTokenData, // ✅ correct key name
  });

  // ✅ SAVE NEW TOKENS
  useAuthStore.getState().setTokens(res.data.token, res.data.refreshToken);

  return res.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
