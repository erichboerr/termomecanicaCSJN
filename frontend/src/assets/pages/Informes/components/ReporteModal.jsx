import React from 'react';
import { formatearInformeServicios } from '../utils/formatearInformeServicios';
import { useReportePDF } from '../hooks/useReportePDF';
import '../css/ReporteModal.css';

export default function ReporteModal({ open, onClose, data, fechaDesde, fechaHasta, filtro }) {
  const texto = formatearInformeServicios(data, fechaDesde, fechaHasta, filtro); 
  const { descargarPDF } = useReportePDF(texto, filtro);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Vista previa del reporte</h2>
        {filtro?.tipo && filtro?.valor && (
          <h4 className="text-muted">
            Filtro por {filtro.tipo}: <strong>{filtro.valor}</strong>
          </h4>
        )}
        <pre className="reporte-preview">{texto}</pre>
        <div className="modal-actions">
          <button onClick={descargarPDF} className="btn btn-success">Descargar PDF</button>
          <button onClick={onClose} className="btn btn-secondary">Cerrar</button>
        </div>
      </div>
    </div>
  );
}