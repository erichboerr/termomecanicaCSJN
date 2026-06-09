import bcrypt from "bcrypt";
import { Usuario, Rol } from "../models/index.js";
import logger from "../helpers/logger.js";
import jwt from "jsonwebtoken";
import { ROLES } from "../constants/roles.js";

/***************************************************************************/

export const crearUsuario = async (req, res) => {
  try {
    //console.log("Datos recibidos:", req.body);
    const { user, password, rol } = req.body;
    if (!user || !password || !rol) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    // Verificar si el usuario ya existe
    try {
      const existingUser = await Usuario.findOne({ where: { usuario: user } });
      if (existingUser) {
        return res.status(400).json({ message: "El usuario ya existe" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        // 👤 Crear usuario
        const newUsuario = await Usuario.create({
          usuario: user,
          password: hashedPassword,
          idRol: rol,
        });

        res.status(201).json(newUsuario);
      }
    } catch (error) {
      logger.error(`Error al verificar usuario existente: ${error.message}`);
      return res.status(500).json({ message: "Error al verificar usuario" });
    }
  } catch (error) {
    logger.error(`Error al crear usuario: ${error.message}`);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};
/***************************************************************************/

//buscamos los usuarios habilitados
export const getUsuariosHabilitados = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: { flagHabilitado: true },
      attributes: ["idUsuario", "usuario"],
    });
    res.status(200).json(usuarios);
  } catch (error) {
    logger.error(`Error al obtener usuarios habilitados: ${error.message}`);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};
/***************************************************************************/

//actualizamos el usuario
export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { flagHabilitado } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    usuario.flagHabilitado = flagHabilitado;
    await usuario.save();

    res.json({ success: true, usuario });
  } catch (error) {
    logger.error(`Error en updateUsuario: ${error.message}`);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};
/***************************************************************************/
//hacemos loging
export const loginUsuario = async (req, res) => {
  const { user, password } = req.body;

  try {
    // Busca el usuario por nombre
    const usuario = await Usuario.findOne({ where: { usuario: user } });
    // Si no existe el usuario, devuelve un error
    if (!usuario) {
      return res.json({ success: false });
    } else if (usuario.flagHabilitado === false) {
      return res.json({ success: false, message: "Usuario inhabilitado" });
    }

    // Compara la contraseña hasheada
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) {
      return res.json({ success: false });
    }

    const token = jwt.sign(
      {
        usuario: usuario.usuario,
        rolId: usuario.idRol,
        userId: usuario.idUsuario,
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" },
    );

    // Devuelve el Nombre de usuario y el idRol
    return res.json({
      success: true,
      usuario: usuario.usuario,
      rolId: usuario.idRol,
      userId: usuario.idUsuario,
      token, // 🔑 acá va el JWT
    });
  } catch (error) {
    logger.error(`Error en loginUsuario: ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default Usuario;
/***************************************************************************/

export const getTecnico = async (req, res) => {
  try {
    const rol = parseInt(req.query.rol, 10);
    if (isNaN(rol)) {
      return res.status(400).json({ message: "Parámetro 'rol' inválido" });
    }

    const tecnicos = await Usuario.findAll({
      where: { idRol: ROLES.TECNICO, flagHabilitado: true },
      
    });
    return res.json(tecnicos);
  } catch (error) {
    logger.error("Error al obtener los técnicos:", error.message);
    return res.status(500).json({ message: "Error al obtener los técnicos" });
  }
};
/***************************************************************************/

export const obtenerTecnicos = async (req, res) => {
  try {
    const tecnicos = await Usuario.findAll({
      where: { idRol: 4, flagHabilitado: true },
      attributes: ["idUsuario", "usuario"],
      include: [
        {
          model: Rol,
          as: "rol",
          attributes: ["rol"],
        },
      ],
    });
    res.json(tecnicos);
  } catch (error) {
    logger.error(`Error al obtener técnicos: ${error.message}`);
    res.status(500).json({ error: "Error al obtener técnicos" });
  }
};
/****************************************************************************/

export const actualizarPassword = async (req, res) => {
  console.log("Datos recibidos para actualizar contraseña:", req.body);
  const { idUsuario, password } = req.body;

  if (!idUsuario || !password) {
    return res.status(400).json({ message: "Faltan datos requeridos" });
  }

  try {
    const usuario = await Usuario.findByPk(idUsuario);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    usuario.password = hashedPassword;
    await usuario.save();
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    logger.error(`Error al actualizar contraseña: ${error.message}`);
    res.status(500).json({ message: "Error al actualizar contraseña" });
  }
};
/***************************************************************************/
