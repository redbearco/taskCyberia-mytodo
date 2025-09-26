"use client";

import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useTransition,
} from "react";
import type { Task, Category } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { TasksContext } from "@/features/tasks/TasksProvider";

import { TaskTitleInput } from "./TaskTitleInput";
import { TaskDescriptionInput } from "./TaskDescriptionInput";
import { TaskCategorySelect } from "./TaskCategorySelect";
import { TaskFormActions } from "./TaskFormActions";

type Props = {
    initial?: Task | null;
    onCancel?: () => void;
};

export const TaskForm: React.FC<Props> = ({ initial = null, onCancel }) => {
    const ctx = React.useContext(TasksContext);
    if (!ctx) return null;
    const { dispatch } = ctx;

    const [title, setTitle] = useState(initial?.title ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [category, setCategory] = useState<Category>(initial?.category ?? "Personal");
    const [completed, setCompleted] = useState<boolean>(initial?.completed ?? false);

    const titleRef = useRef<HTMLInputElement | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setTitle(initial?.title ?? "");
        setDescription(initial?.description ?? "");
        setCategory(initial?.category ?? "Personal");
        setCompleted(initial?.completed ?? false);

        titleRef.current?.focus();
    }, [initial]);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!title.trim()) {
                alert("عنوان کار الزامی است.");
                titleRef.current?.focus();
                return;
            }

            const payload: Task = {
                id: initial?.id ?? uuidv4(),
                title: title.trim(),
                description: description.trim(),
                category,
                completed,
                createdAt: initial?.createdAt ?? new Date().toISOString(),
                dueDate: initial?.dueDate ?? null,
            };

            startTransition(() => {
                if (initial) {
                    dispatch({ type: "UPDATE", payload });
                    onCancel?.();
                } else {
                    dispatch({ type: "ADD", payload });
                }

                setTitle("");
                setDescription("");
                setCategory("Personal");
                setCompleted(false);
            });
        },
        [title, description, category, completed, initial, dispatch, onCancel]
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded-md shadow">
            <TaskTitleInput ref={titleRef} value={title} onChange={setTitle} />
            <TaskDescriptionInput value={description} onChange={setDescription} />

            <div className="flex gap-2 items-center">
                <TaskCategorySelect value={category} onChange={setCategory} />

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    <span>انجام شده</span>
                </label>

                <div className="ml-auto">
                    <TaskFormActions isPending={isPending} isEdit={!!initial} onCancel={onCancel} />
                </div>
            </div>
        </form>
    );
};