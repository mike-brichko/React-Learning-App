import { useState } from 'react';
import type { UseCounterReturn } from '../types';

/**
 * Custom hook for managing a counter with increment, decrement, and reset functionality
 * @param initialValue - The initial value for the counter (default: 0)
 * @returns Object with count value and control functions
 */
export const useCounter = (initialValue: number = 0): UseCounterReturn => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return {
    count,
    increment,
    decrement,
    reset,
  };
};
