"use client";

import { useState, useDeferredValue } from "react";
import type { Task } from "@/lib/types";
import { TaskForm } from "@/components/task-form/TaskForm";
import { TaskList } from "@/components/task-list/TaskList";

const categories = ["All", "Personal", "Work", "Other"] as const;
type Category = (typeof categories)[number];

export default function Page() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const [category, setCategory] = useState<Category>("All");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          مدیریت کارها
        </h1>
      </div>

      <TaskForm initial={editingTask} onCancel={() => setEditingTask(null)} />
      <div className="sticky top-0 bg-slate-50 dark:bg-slate-800 p-4 space-y-3 rounded-lg shadow-sm border dark:border-slate-700">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو در کارها..."
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
        />
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() =>
                setCategory(c as "All" | "Personal" | "Work" | "Other")
              }
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${category === c
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border text-slate-600 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600"
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <TaskList
        query={deferredQuery}
        categoryFilter={category === "All" ? null : category}
        onEdit={(t) => setEditingTask(t)}
      />
    </main>
  );
}
