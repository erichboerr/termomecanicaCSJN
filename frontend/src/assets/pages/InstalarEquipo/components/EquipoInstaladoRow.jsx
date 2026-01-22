function RowEquipoInstalado({ label, value }) {
  if (!value) return null;

  return (
    <div className="row mb-3">
      <div className="col-12 col-md-4">{label}:</div>
      <div className="col-12 col-md-8">{value}</div>
    </div>
  );
}

export default RowEquipoInstalado;
