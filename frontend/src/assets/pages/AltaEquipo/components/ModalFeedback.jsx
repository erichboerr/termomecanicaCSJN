function ModalFeedback({ visible, message, type = "info", onClose }) {
  if (!visible || !message) return null;

  return (
    <div className="overlay">
      <div className={`modal ${type}`}>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ModalFeedback;