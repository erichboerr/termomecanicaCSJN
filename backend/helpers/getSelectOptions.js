import {Marca, Modelo, Alimentacion, Potencia, Capacidad, GasRefrigerante, Estado} from "../models/index.js";
import { modelsMap, fieldMap } from "./SelectConfig.js";

export async function getSelectOptions(keys = []) {
  const result = {};

  for (const key of keys) {
    const Model = modelsMap[key];
    const fields = fieldMap[key];
    if (!Model || !fields) continue;

    // Verificar si es modelo y necesita idMarca
    if (key === "modelo") {
      const records = await Model.findAll({
        where: {
          flagHabilitado: true,
          deletedAt: null,
        },
        attributes: [fields.id, fields.value, "idMarca"],
        order: [[fields.value, "ASC"]],
      });
      // Agregar idMarca al resultado
      result[key] = records.map((r) => ({
        id: r[fields.id],
        value: r[fields.value],
        idMarca: r["idMarca"],
      }));
    } else {
      // busca todos los registrios que tengan el flagHabilitado en true
      //y la fecha de baja en vacio
      const records = await Model.findAll({
        where: {
          flagHabilitado: true,
          deletedAt: null,
        },
        attributes: [fields.id, fields.value],
        order: [[fields.value, "ASC"]],
      });
      // muestra todos los resultados
      result[key] = records.map((r) => ({
        id: r[fields.id],
        value: r[fields.value],
      }));
    }
  }

  return result;
}
