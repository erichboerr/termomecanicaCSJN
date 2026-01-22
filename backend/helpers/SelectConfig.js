import { TipoEquipo, Marca, Modelo, Alimentacion, Potencia, Capacidad, GasRefrigerante, Estado, Locacion} from "../models/index.js";

export const modelsMap = {
  tipoEquipo: TipoEquipo,
  marca: Marca,
  modelo: Modelo,
  alimentacion: Alimentacion,
  potencia: Potencia,
  capacidad: Capacidad,
  gasRefrigerante: GasRefrigerante,
  estado: Estado,
  locacion: Locacion,
};

export const fieldMap = {  
  tipoEquipo: { id: "idTipoEquipo", value: "tipoEquipo" },
  marca: { id: "idMarca", value: "marca" },
  modelo: { id: "idModelo", value: "modelo", foreignKey: "idMarca" }, 
  alimentacion: { id: "idAlimentacion", value: "alimentacion" },
  potencia: { id: "idPotencia", value: "potencia" },
  capacidad: { id: "idCapacidad", value: "capacidad" },
  gasRefrigerante: { id: "idGasRefrigerante", value: "gasRefrigerante" },
  estado: { id: "idEstado", value: "estado" },
  locacion: { id: "idLocacion", value: "locacion" },
};

