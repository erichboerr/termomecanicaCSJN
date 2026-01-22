import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EquipoCard from "./EquipoCard";

const EquipoModal = ({ show, onHide, equipo, onUpdateFotos }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 2);
    console.log("Archivos seleccionados:", selected);
    setFiles(selected);
  };

const handleUpload = () => {
  if (files.length === 0) return alert("Seleccioná al menos una foto");

  const formData = new FormData();
  files.forEach((file) => formData.append("foto", file));

  // 🔍 Confirmación visual
  console.log("FormData keys:", [...formData.keys()]);
  console.log("FormData fotos:", formData.getAll("foto"));

  onUpdateFotos(formData);
  setFiles([]);
  onHide();
};

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Equipo en oficina: {equipo?.oficina}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EquipoCard equipo={equipo} />

        <div className="mt-4">
          <label htmlFor="fotos" className="form-label fw-bold">
            Reemplazar fotos (máx 2)
          </label>
          <input
            type="file"
            name="foto"
            accept="image/*"
            multiple
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          <i className="bi bi-upload"></i> Actualizar fotos
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EquipoModal;
