export const useToast = (setToast) => ({
  showToast: (message, type = "info") => setToast({ message, type }),
  clearToast: () => setToast(null),
});