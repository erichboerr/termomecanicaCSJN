const isTecnicoValido = (id) => typeof id === "string" && /^\d+$/.test(id);
export default isTecnicoValido;