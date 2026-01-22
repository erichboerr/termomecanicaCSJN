// src/utils/clientLogger.js
export const logClientError = async (errorData) => {
  try {
    await fetch('/api/log-client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    });
  } catch (err) {
    // fallback local
    console.warn('Error al enviar log visual:', err);
  }
};