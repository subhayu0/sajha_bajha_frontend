import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const {
    immediate = true,
    cacheKey = null,
    cacheTime = 5 * 60 * 1000, // 5 minutes
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cache for storing API responses
  const cache = new Map();

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      // Check cache if cacheKey is provided
      if (cacheKey && cache.has(cacheKey)) {
        const cachedData = cache.get(cacheKey);
        if (Date.now() - cachedData.timestamp < cacheTime) {
          setData(cachedData.data);
          setLoading(false);
          return cachedData.data;
        } else {
          cache.delete(cacheKey);
        }
      }

      const response = await apiFunction(...args);
      const responseData = response.data || response;

      setData(responseData);

      // Cache the response if cacheKey is provided
      if (cacheKey) {
        cache.set(cacheKey, {
          data: responseData,
          timestamp: Date.now(),
        });
      }

      return responseData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, cacheKey, cacheTime]);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate, ...dependencies]);

  // Clear cache function
  const clearCache = useCallback(() => {
    if (cacheKey) {
      cache.delete(cacheKey);
    }
  }, [cacheKey]);

  // Clear all cache
  const clearAllCache = useCallback(() => {
    cache.clear();
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    clearCache,
    clearAllCache,
  };
}; 