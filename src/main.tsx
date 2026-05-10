import { StrictMode } from "react";
import { router } from "./App.tsx";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/react-query.ts";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/theme-context.tsx";
import { Suspense } from "react";
import "./i18n";
import PageLoading from "./components/common/page-loading/page-loading.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<PageLoading />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
