import { getSelectOptions } from "../helpers/getSelectOptions.js";
import { modelsMap, fieldMap } from "../helpers/SelectConfig.js";
import logger from "../helpers/logger.js";

export async function getAllSelectOptions(req, res) {
  try {
    const keys = [
      "tipoEquipo",
      "marca",
      "modelo",
      "alimentacion",
      "potencia",
      "capacidad",
      "gasRefrigerante",
      "estado",
      "locacion",
           
    ];
    const options = await getSelectOptions(keys);
    res.json(options);
  } catch (error) {
    logger.error(`Error al obtener opciones: ${error.message}`);
    res.status(500).json({ error: "Error al obtener opciones" });
  }
};

export async function addSelectOption(req, res) {
  const { key } = req.params;
  const { value } = req.body;

  const allowedKeys = Object.keys(modelsMap);
  if (!allowedKeys.includes(key)) {
    return res.status(400).json({ error: "Clave no permitida" });
  }

  const Model = modelsMap[key];
  const fields = fieldMap[key];

  if (!Model || !fields) {
    return res.status(400).json({ error: "Clave inválida" });
  }

  try {
    // Detectar si value es objeto o string
    let valueToCheck = value;
    if (typeof value === "object" && value !== null) {
      valueToCheck = value[fields.value]; 
    }

    // Construir cláusula WHERE dinámica
    const whereClause = { [fields.value]: valueToCheck };

    if (fields.foreignKey && value[fields.foreignKey]) {
      whereClause[fields.foreignKey] = value[fields.foreignKey];
    }

    const existing = await Model.findOne({ where: whereClause });
    if (existing) {
      return res.status(409).json({ error: "Ya existe ese valor" });
    }

    // Crear nuevo registro
    const newRecord = await Model.create({
      ...(typeof value === "object" ? value : { [fields.value]: value }),
      flaghabilitado: true,
    });

    res.status(201).json({
      id: newRecord[fields.id],
      value: newRecord[fields.value],
      ...(fields.foreignKey && {
        [fields.foreignKey]: newRecord[fields.foreignKey],
      }),
    });
  } catch (err) {
    logger.error(`Error en addSelectOption: ${err.message}`);
    res.status(500).json({ error: "Error al crear el registro" });
  }
}
