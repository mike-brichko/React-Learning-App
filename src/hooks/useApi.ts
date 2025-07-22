import { useState, useEffect, useCallback } from 'react';
import type { UseApiReturn } from '../types';

/**
 * Custom hook for making API calls with loading, error, and data management
 * @param apiFunction - Function that returns a Promise with the API call
 * @param dependencies - Array of dependencies that trigger refetch when changed
 * @returns Object with data, loading state, error state, and refetch function
 */
export const useApi = <T>(
  apiFunction: () => Promise<T>,
  dependencies: unknown[] = []
): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
