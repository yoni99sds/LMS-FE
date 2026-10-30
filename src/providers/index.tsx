
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store";
import { logout as clearAuthSession } from "@/features/auth/authSlice";
import { useEffect, type ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export function Providers({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const handleSessionExpired = () => {
      store.dispatch(clearAuthSession());

      if (
        window.location.pathname !== "/login"
      ) {
        window.location.replace("/login");
      }
    };

    window.addEventListener(
      "lms:session-expired",
      handleSessionExpired
    );

    return () => {
      window.removeEventListener(
        "lms:session-expired",
        handleSessionExpired
      );
    };
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
