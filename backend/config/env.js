export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';

export const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
export const backendUrl = process.env.BACKEND_URL || 'http://localhost:5050';

export const getBaseUrl = () => isProd ? frontendUrl : 'http://localhost:5173';
export const getApiUrl = () => isProd ? backendUrl : 'http://localhost:5051';

