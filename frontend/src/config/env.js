export const isDev = import.meta.env.MODE === 'development';
export const isProd = import.meta.env.MODE === 'production';

export const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050';
export const frontendUrl = import.meta.env.VITE_FRONT_URL || 'http://localhost:5173';

export const getBaseUrl = () => isProd ? frontendUrl : 'http://localhost:5173';
export const getApiUrl = () => isProd ? backendUrl : 'http://localhost:5050';