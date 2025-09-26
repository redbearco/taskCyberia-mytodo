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
        <div className="p-3 bg-white rounded shadow flex items-start gap-3">
            <input type="checkbox" checked={task.completed} onChange={toggle} className="mt-1" />
            <div className="flex-1">
                <div className={`font-medium ${task.completed ? "line-through text-slate-400" : ""}`}>
                    {task.title}
                </div>
                {task.description && <div className="text-sm text-slate-500">{task.description}</div>}
            </div>
            <div className="flex gap-2">
                {onEdit && (
                    <button onClick={edit} className="px-3 py-1 border rounded">
                        ویرایش
                    </button>
                )}
                <button onClick={del} className="px-3 py-1 border rounded text-red-600">
                    حذف
                </button>
            </div>
        </div>
    );
};