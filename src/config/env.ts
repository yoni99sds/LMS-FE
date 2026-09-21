const getEnv = (key: string, fallback?: string) => {
  const value = import.meta.env[key];

  if (!value && !fallback) {
    throw new Error(`Missing env: ${key}`);
  }

  return value || fallback;
};

export const ENV = {
  API_URL: getEnv('VITE_API_URL')
};