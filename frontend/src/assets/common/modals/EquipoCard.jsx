import EquipoInfo from "./EquipoCard/EquipoInfo";
import EquipoFotos from "./EquipoCard/EquipoFotos";
import "./EquipoCard/css/EquipoCard.css";

function EquipoCard({ equipo }) {
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <EquipoInfo equipo={equipo} />
        
        </div>
        <div className="col-md-6">
          <EquipoFotos
            foto1Path={equipo.foto1Path}
            foto2Path={equipo.foto2Path}
          />
        </div>
      </div>
      
    </>
  );
}

export default EquipoCard;
