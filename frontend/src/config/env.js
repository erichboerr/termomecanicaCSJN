export const isDev = import.meta.env.MODE === 'development';
export const isProd = import.meta.env.MODE === 'production';

export const frontendUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';
export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5050';

export const getBaseUrl = () => isProd ? frontendUrl : 'http://localhost:5173';
export const getApiUrl = () => isProd ? backendUrl : 'http://localhost:5050';