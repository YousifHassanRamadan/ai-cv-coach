import axios from "axios";
import { useAuthStore } from "../store/auth";
import { refreshToken } from "../api/auth";

export const api = axios.create({
  baseURL:
    "https://ai-resume-interview-coach-nodejs-backend-production.up.railway.app/v1",
  headers: { "Content-Type": "application/json" },
});

// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  console.log("➡️ Request:", config.url);

  if (token) {
    console.log("🔐 Attaching token:", token);
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("⚠️ No token in store");
  }

  return config;
});

// ================= REFRESH QUEUE =================
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  console.log("📦 Processing queue:", failedQueue.length);

  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      console.error("❌ Queue failed:", error);
      reject(error);
    } else {
      console.log("✅ Queue resolved with token:", token);
      resolve(token);
    }
  });

  failedQueue = [];
};

// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.config.url, response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.error(
      "❌ API Error:",
      originalRequest?.url,
      error.response?.status,
    );

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn("🔁 401 detected, starting refresh...");
      originalRequest._retry = true;

      if (isRefreshing) {
        console.log("⏳ Refresh in progress, queueing request...");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          console.log("🔄 Retrying queued request with token:", token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        console.log("📞 Calling refreshToken()...");
        const data = await refreshToken();

        const newToken = data.token;
        const newRefreshToken = data.refreshToken;

        console.log("🆕 New token:", newToken);
        console.log("🆕 New refresh token:", newRefreshToken);

        // ✅ Save BOTH in Zustand
        useAuthStore.getState().setTokens(newToken, newRefreshToken);
        console.log("💾 Tokens saved in Zustand");

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        console.log("🔁 Retrying original request...");
        return api(originalRequest);
      } catch (err) {
        console.error("❌ Refresh failed:", err);
        processQueue(err, null);

        useAuthStore.getState().clearTokens();
        console.log("🧹 Tokens cleared");

        // ❌ COMMENTED REDIRECT
        window.location.href = "/auth";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
        console.log("♻️ Refresh finished");
      }
    }

    return Promise.reject(error);
  },
);
