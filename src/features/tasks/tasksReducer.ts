import { Task } from '@/lib/types';

export type TasksState = Task[];

export type TaskAction =
  | { type: 'LOAD'; payload: Task[] }
  | { type: 'ADD'; payload: Task }
  | { type: 'UPDATE'; payload: Task }
  | { type: 'DELETE'; payload: string }
  | { type: 'TOGGLE'; payload: string };

export function tasksReducer(state: TasksState, action: TaskAction): TasksState {
  switch (action.type) {
    case 'LOAD':
      return [...action.payload];
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    case 'DELETE':
      return state.filter((t) => t.id !== action.payload);
    case 'TOGGLE':
      return state.map((t) => (t.id === action.payload ? { ...t, completed: !t.completed } : t));
    default:
      return state;
  }
}