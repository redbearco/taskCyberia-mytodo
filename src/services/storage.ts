export const STORAGE_KEY = 'todo_tasks_v1';

export function loadTasks<T>(key = STORAGE_KEY): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function saveTasks<T>(data: T, key = STORAGE_KEY) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}