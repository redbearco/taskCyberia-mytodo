export type Category = "Personal" | "Work" | "Other";

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: Category;
  completed: boolean;
  createdAt: string;
  dueDate?: string | null;
}