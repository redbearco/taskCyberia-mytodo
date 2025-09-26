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
      <h1 className="text-2xl font-bold">مدیریت کارها</h1>

      <TaskForm
        initial={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو..."
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex gap-2 mb-4">
          {categories?.map((c) => (
            <button
              key={c}
              onClick={() =>
                setCategory(c as "All" | "Personal" | "Work" | "Other")
              }
              className={`px-3 py-1 rounded ${category === c ? "bg-blue-600 text-white" : "bg-white border"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        <TaskList
          query={deferredQuery}
          categoryFilter={category === "All" ? null : category}
          onEdit={(t) => setEditingTask(t)}
        />
      </div>
    </main>
  );
}