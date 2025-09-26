"use client";

import React, { useContext, useMemo, useCallback } from "react";
import { TasksContext } from "@/features/tasks/TasksProvider";
import { TaskItem } from "./TaskItem";
import type { Task } from "@/lib/types";

type Props = {
    query?: string;
    categoryFilter?: string | null;
    onEdit?: (t: Task) => void;
};

export const TaskList: React.FC<Props> = ({
    query = "",
    categoryFilter = null,
    onEdit,
}) => {
    const ctx = useContext(TasksContext);
    const tasks = ctx?.tasks ?? [];
    const dispatch = ctx?.dispatch;

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return tasks
            .filter((t) => {
                if (categoryFilter && categoryFilter !== "All" && t.category !== categoryFilter)
                    return false;
                if (!q) return true;
                return (
                    t.title.toLowerCase().includes(q) ||
                    (t.description ?? "").toLowerCase().includes(q)
                );
            })
            .sort(
                (a, b) =>
                    Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
            );
    }, [tasks, query, categoryFilter]);

    const handleToggle = useCallback(
        (id: string) => dispatch && dispatch({ type: "TOGGLE", payload: id }),
        [dispatch]
    );

    const handleDelete = useCallback(
        (id: string) => {
            if (dispatch && confirm("آیا از حذف این کار مطمئنی؟")) {
                dispatch({ type: "DELETE", payload: id });
            }
        },
        [dispatch]
    );

    if (!ctx) {
        return (
            <div className="p-4 text-center text-slate-500 bg-slate-100 rounded-lg">
                داده‌ای برای نمایش موجود نیست
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {filtered.length === 0 ? (
                <div className="p-4 text-center text-slate-500 bg-slate-100 rounded-lg">
                    کاری یافت نشد
                </div>
            ) : (
                filtered.map((t) => (
                    <TaskItem
                        key={t.id}
                        task={t}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onEdit={onEdit}
                    />
                ))
            )}
        </div>
    );
};