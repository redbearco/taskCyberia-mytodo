"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { TasksProvider } from "@/features/tasks/TasksProvider";

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <TasksProvider>{children}</TasksProvider>
        </QueryClientProvider>
    );
}