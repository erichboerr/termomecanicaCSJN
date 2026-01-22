import {Equipo, Capacidad} from "../models/index.js";


export const getCapacidadesPorModelo = async ({ idMarca, idModelo }) => {
  if (!idMarca || !idModelo) {
    throw new Error("Faltan parámetros: idMarca y/o idModelo");
  }

  const capacidades = await Equipo.findAll({
    where: { idMarca, idModelo },
    attributes: ["idCapacidad"],
    include: [
      {
        model: Capacidad,
        as: "capacidad",
        attributes: ["capacidad"],
      },
    ],
    group: ["equipos.idCapacidad", "capacidad.idCapacidad", "capacidad.capacidad"],
  });

  return capacidades.map((item) => ({
    id: item.idCapacidad,
    capacidad: item.capacidad?.capacidad ?? "Sin dato",
  }));
};