// Common types used throughout the application

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: User;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface CounterState {
  value: number;
  history: number[];
}

export interface ThemeMode {
  mode: 'light' | 'dark';
}

export interface NavigationItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Hook return types
export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prevValue: T) => T)) => void;
  removeValue: () => void;
}

export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
