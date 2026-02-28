import { create } from "zustand";
import type { AuthState } from "./authStore.types";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      setTokens: (token, refreshToken) => set({ token, refreshToken }),
      clearTokens: () => set({ token: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
