import { Modal } from "react-bootstrap";
import EquipoCard from "./EquipoCard";

const ModalEquipoCard = ({ show, onClose, equipo, rol }) => {
  if (!equipo) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle del equipo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EquipoCard equipo={equipo} rol={rol} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalEquipoCard;