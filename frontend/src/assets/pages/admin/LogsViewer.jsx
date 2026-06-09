import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axiosInstance from "../../../utils/axiosInstance.js";

const LogsViewer = () => {
  const [logs, setLogs] = useState([]);
  const [filtro, setFiltro] = useState("");

  const cargarLogs = async () => {
    try {
      const { data } = await axiosInstance.get("/logs");

      if (Array.isArray(data)) {
        setLogs(data);
      } else {
        console.warn("Respuesta inesperada:", data);
        setLogs([]);
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 403) {
        setLogs("denegado");
      } else if (status === 401) {
        setLogs("sinToken");
      } else {
        console.error("Error al cargar logs:", err);
        setLogs([]);
      }
    }
  };

  useEffect(() => {
    cargarLogs();
  }, []);

  const logsFiltrados = Array.isArray(logs)
    ? logs.map((log) => ({
        ...log,
        content: log.content
          .split("\n")
          .filter((line) => line.toLowerCase().includes(filtro.toLowerCase()))
          .join("\n"),
      }))
    : [];

  if (logs === "denegado") {
    return (
      <Card className="m-3">
        <Card.Body>
          <h5 className="text-danger">🚫 No tenés permiso para ver los logs del sistema</h5>
        </Card.Body>
      </Card>
    );
  }

  if (logs === "sinToken") {
    return (
      <Card className="m-3">
        <Card.Body>
          <h5 className="text-warning">🔒 Token faltante. Iniciá sesión nuevamente para acceder a los logs.</h5>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="m-3">
      <Card.Header>
        <h5 className="mb-0">🧠 Logs del sistema</h5>
      </Card.Header>
      <Card.Body>
        <Form.Control
          type="text"
          placeholder="Filtrar por palabra clave..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="mb-3"
        />
        {logsFiltrados.map(({ file, content }) => (
          <Card key={file} className="mb-3">
            <Card.Header>{file}</Card.Header>
            <Card.Body>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {content || "Sin contenido"}
              </pre>
            </Card.Body>
          </Card>
        ))}
        <Button variant="outline-success" onClick={cargarLogs}>
          🔄 Recargar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LogsViewer;