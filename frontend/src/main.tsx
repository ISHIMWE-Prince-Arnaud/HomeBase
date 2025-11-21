import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      staleTime: 5000, // 5 seconds
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
