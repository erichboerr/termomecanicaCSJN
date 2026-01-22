// helpers/getMarcaModelo.js
export const getMarca = (equipo) =>
  equipo?.equipo?.marca?.marca || equipo?.Equipo?.Marca?.marca || "Sin marca";

export const getModelo = (equipo) =>
  equipo?.equipo?.modelo?.modelo || equipo?.Equipo?.Modelo?.modelo || "Sin modelo";