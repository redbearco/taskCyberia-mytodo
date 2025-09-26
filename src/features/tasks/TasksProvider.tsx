"use client";
import React, { createContext, useReducer, useEffect } from "react";
import { tasksReducer } from "./tasksReducer";
import { loadTasks, saveTasks } from "@/services/storage";
import type { Task } from "@/lib/types";

type TasksContextType = {
  tasks: Task[];
  dispatch: React.Dispatch<any>;
};

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = (typeof window !== "undefined" ? loadTasks<Task[]>() ?? [] : []) as Task[];
  const [tasks, dispatch] = useReducer(tasksReducer, initial);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};