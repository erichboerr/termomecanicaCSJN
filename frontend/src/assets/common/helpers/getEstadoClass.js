const getEstadoClass = (estado) => {
  switch (estado) {
    case "OPERATIVO":
      return "bg-success";
    case "MANTENIMIENTO":
      return "bg-warning text-dark";
    case "URGENTE":
      return "bg-danger";
      case "FUERA DE SERVICIO":
      return "bg-black text-white";
    default:
      return "bg-gray text-white";
  }
};

export default getEstadoClass;