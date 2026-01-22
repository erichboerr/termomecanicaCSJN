import Roles from "../models/Rol.js";
import logger from "../helpers/logger.js";

export const createRole = async (req, res) => {
  try {
    const { rol } = req.body;
    const newRole = await Roles.create({ rol });
    res.status(201).json(newRole);
  } catch (error) {
    logger.error(`Error al crear el rol: ${error.message}`);
    res.status(500).json({ message: "Error al crear el rol" });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll({
      where: { flagHabilitado: true },
      attributes: ["idRol", "rol"], // solo los campos necesarios
      order: [["idRol", "ASC"]],
    });
    res.json(roles);
  } catch (error) {
    logger.error(`Error al obtener roles: ${error.message}`);
    res.status(500).json({ message: "Error al obtener roles" });
  }
};
