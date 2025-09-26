"use client";

import React, { useCallback } from "react";
import type { Task } from "@/lib/types";

type Props = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit?: (task: Task) => void;
};

export const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete, onEdit }) => {
    const toggle = useCallback(() => onToggle(task.id), [onToggle, task.id]);
    const del = useCallback(() => onDelete(task.id), [onDelete, task.id]);
    const edit = useCallback(() => onEdit?.(task), [onEdit, task]);

    return (
        <div className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition">
            <div className="flex-1">
                <div
                    className={`text-lg font-semibold ${task.completed
                            ? "line-through text-slate-400"
                            : "text-slate-800 dark:text-slate-100"
                        }`}
                >
                    {task.title}
                </div>
                {task.description && (
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {task.description}
                    </div>
                )}

                <div className="flex gap-2 mt-3 flex-wrap">

                    <button
                        onClick={toggle}
                        className={`px-3 py-1 text-xs font-medium rounded-full border transition ${task.completed
                                ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700"
                                : "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700"
                            }`}
                    >
                        {task.completed ? " انجام شده" : " در حال انجام"}
                    </button>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        {task.category}
                    </span>
                </div>
            </div>

            <div className="flex gap-2 self-end sm:self-auto">
                {onEdit && (
                    <button
                        onClick={edit}
                        className="px-3 py-1 text-sm rounded-lg border border-slate-300 hover:bg-slate-100 transition dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                        ویرایش
                    </button>
                )}
                <button
                    onClick={del}
                    className="px-3 py-1 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                >
                    حذف
                </button>
            </div>
        </div>
    );
};