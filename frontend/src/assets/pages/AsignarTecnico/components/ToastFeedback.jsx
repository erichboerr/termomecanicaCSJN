import React, { useEffect } from 'react';
import '../css/ToastFeedback.css';

const ToastFeedback = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast-container">
      <div className={`toast show toast-${type}`}>
        <div className="d-flex align-items-center justify-content-between px-3 py-2">
          <div className="toast-body">{message}</div>
          <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
};

export default ToastFeedback;