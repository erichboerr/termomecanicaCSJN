import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalMotivo = ({ show, onClose, onConfirm }) => {
  const [motivo, setMotivo] = useState("");

  const handleConfirm = () => {
    if (motivo.trim()) {
      const motivo1 = motivo.trim().toUpperCase();
      onConfirm(motivo1);
      setMotivo("");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Motivo del Pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Describa el motivo:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Ej: No enfria, hace ruido."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMotivo;