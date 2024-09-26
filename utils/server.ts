// Utility function for retries and timeouts
export const withRetry = async (
  fn: () => Promise<any>,
  retries: number = 3,
  timeout: number = 5000
) => {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const result = await fn();
      clearTimeout(timeoutId);
      return result;
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, error);
    }
  }
  throw lastError;
};
