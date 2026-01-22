import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { logClientError } from "./utils/clientLogger.js";

// Captura global de errores visuales
window.onerror = function (message, source, lineno, colno, error) {
  logClientError({
    message,
    source,
    lineno,
    colno,
    stack: error?.stack,
    userAgent: navigator.userAgent
  });
};

window.addEventListener("unhandledrejection", function (event) {
  logClientError({
    message: event.reason?.message || "Unhandled promise rejection",
    stack: event.reason?.stack,
    userAgent: navigator.userAgent
  });
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
