"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: any) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
