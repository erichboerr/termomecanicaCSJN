import { useState } from 'react'
import InformePorFechas from "./components/InformePorFechas";
import InformePorTecnico from "./components/InformePorTecnico";
import InformePorOficina from "./components/InformePorOficina";

export default function ReportesPage() {
  const [tipo, setTipo] = useState('')

  const renderFormulario = () => {
    switch (tipo) {
      case 'fechas':
        return <InformePorFechas />
      case 'tecnico':
        return <InformePorTecnico />
      case 'equipo':
        return <InformePorOficina />
      default:
        return null
    }
  }
  const idRol = parseInt(sessionStorage.getItem('rolId'), 10); // Asegúrate de convertir a número entero

  return (
    <div className="container py-4">
  <h3 className="mb-4 text-center">Seleccionar tipo de informe</h3>

  <div className="d-flex justify-content-center gap-4 mb-4">
    <button className="btn btn-outline-primary" onClick={() => setTipo('fechas')}>
      Por Fechas
    </button>    
   {idRol !== 3 && (
  <button className="btn btn-outline-primary" onClick={() => setTipo('tecnico')}>
    Por Técnico
  </button>
)}
    <button className="btn btn-outline-primary" onClick={() => setTipo('equipo')}>
      Por Oficina
    </button>
  </div>

  {renderFormulario()}
</div>
  )
}