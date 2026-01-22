import { Modal, Button } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

const ModalQR = ({ show, onClose, equipo }) => {
  const qrRef = useRef(null);

  if (!equipo) return null;

  const id = equipo?.idEquipoInstalado;
  if (!id || isNaN(id)) {
  console.warn("⚠️ ID inválido para QR:", equipo?.idEquipoInstalado);
}

  const baseUrl = import.meta.env.VITE_FRONT_URL.replace(/\/$/, "");

  const url = id
    ? `${baseUrl}/equipoDetalle?id=${id}`
    : `${baseUrl}/equipoDetalle?id=sin-id`;

  //console.log("🧾 Equipo recibido en ModalQR:", equipo);
  //console.log("🔗 URL generada para QR:", url);

  const handlePrint = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) {
      alert("No se pudo generar el QR.");
      return;
    }

    const imgData = canvas.toDataURL("image/png");
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("No se pudo abrir la ventana de impresión.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir QR</title>
          <style>
            body {
              text-align: center;
              font-family: sans-serif;
              margin-top: 40px;
            }
            img {
              width: 220px;
              height: 220px;
            }
          </style>
        </head>
        <body>
          <img src="${imgData}" alt="QR del equipo" />
          <p>${url}</p>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>QR del equipo</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div ref={qrRef}>
          <QRCodeCanvas value={url} size={220} />
        </div>
        <p className="mt-3 small text-muted">{url}</p>
        {!id && (
          <p className="text-danger fw-bold">
            ⚠️ El equipo no tiene ID. El QR puede estar incompleto.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handlePrint}>
          <i className="bi bi-printer me-1"></i> Imprimir QR
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalQR;
