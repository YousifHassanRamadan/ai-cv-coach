import axios from "axios";
import { useAuthStore } from "../store/auth";
import { refreshToken } from "../api/auth";

// ================= MAIN API =================
export const api = axios.create({
  baseURL: "https://ai-interview-coach-8c74448dd4ab.herokuapp.com/v1",
  headers: { "Content-Type": "application/json" },
});

// ================= ML API (used in one case only) =================
export const mlApi = axios.create({
  baseURL: "https://maagdyy-ai-interview-ml-backend-2.hf.space/api/v1",
  headers: { "Content-Type": "application/json" },
});

// ================= ML API INTERCEPTOR =================
mlApi.interceptors.request.use((config) => {
  const interviewToken = localStorage.getItem("interview-token");
  if (interviewToken) {
    config.headers.Authorization = `Bearer ${interviewToken}`;
  }
  return config;
});

// ================= REFRESH QUEUE =================
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  // console.log("📦 Processing queue:", failedQueue.length);
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      console.error("❌ Queue failed:", error);
      reject(error);
    } else {
      // console.log("✅ Queue resolved with token:", token);
      resolve(token);
    }
  });
  failedQueue = [];
};

// ================= ATTACH REQUEST INTERCEPTOR =================
const attachRequestInterceptor = (instance: typeof api) => {
  instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    // console.log("➡️ Request:", config.url);
    if (token) {
      // console.log("🔐 Attaching token:", token);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // console.log("⚠️ No token in store");
    }
    return config;
  });
};

// ================= ATTACH RESPONSE INTERCEPTOR =================
const attachResponseInterceptor = (instance: typeof api) => {
  instance.interceptors.response.use(
    (response) => {
      // console.log("✅ Response:", response.config.url, response.status);
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
          // console.log("⏳ Refresh in progress, queueing request...");
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            // console.log("🔄 Retrying queued request with token:", token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          });
        }

        isRefreshing = true;
        try {
          // console.log("📞 Calling refreshToken()...");
          const data = await refreshToken();
          const newToken = data.token;
          const newRefreshToken = data.refreshToken;
          // console.log("🆕 New token:", newToken);
          // console.log("🆕 New refresh token:", newRefreshToken);

          useAuthStore.getState().setTokens(newToken, newRefreshToken);
          // console.log("💾 Tokens saved in Zustand");

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);
          // console.log("🔁 Retrying original request...");
          return instance(originalRequest);
        } catch (err) {
          // console.error("❌ Refresh failed:", err);
          processQueue(err, null);
          useAuthStore.getState().clearTokens();
          // console.log("🧹 Tokens cleared");
          window.location.href = "/auth";
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
          // console.log("♻️ Refresh finished");
        }
      }

      return Promise.reject(error);
    },
  );
};

// ================= APPLY TO BOTH INSTANCES =================
attachRequestInterceptor(api);

attachResponseInterceptor(api);
