import { useState } from "react";

export function useModalFeedback() {
  const [feedback, setFeedback] = useState({
    visible: false,
    message: "",
    type: "info", // success | error | warning | info
  });

  const showFeedback = (message, type = "info") => {
    if (typeof message !== "string" || message.trim() === "") return;

    setFeedback((prev) => {
      if (prev.message === message && prev.visible) return prev;
      return { visible: true, message, type };
    });
  };
  const hideFeedback = () => {
    setFeedback({ visible: false, message: "", type: "info" });
  };

  return {
    feedback,
    showFeedback,
    hideFeedback,
  };
}
