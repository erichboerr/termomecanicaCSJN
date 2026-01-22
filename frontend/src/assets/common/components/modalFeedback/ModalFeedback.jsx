import styles from "./ModalFeedback.module.css";

function ModalFeedback({ message, type = "info", onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${styles[type]}`}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeBtn}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ModalFeedback;