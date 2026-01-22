const API_URL = import.meta.env.VITE_API_URL;
const EquipoFotos = ({ foto1Path, foto2Path }) => {
  const paths = [foto1Path, foto2Path].filter(Boolean);
  let fotoNum = 1;

  return (
    <div className="d-flex flex-column align-items-center">
      {paths.map((path) => (
        <img
          key={path}
          src={`${API_URL}${path}`}
          alt={`Foto ${fotoNum++}`}
          className="img-thumbnail mb-3"
          style={{ width: "100%", maxWidth: "250px", objectFit: "cover" }}
        />
      ))}
    </div>
  );
};

export default EquipoFotos;