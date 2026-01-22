import {
  Reparaciones,
  EquipoInstalado,
  Equipo,
  Marca,
  Modelo,
  Usuario,
  ObservacionesReparaciones,
} from "../models/index.js";
import { formatearFecha } from "../utils/formatearFecha.js";
import { limpiarCampo } from "../utils/limpiarCampo.js";
import { formatearEstadoReparacion } from "../helpers/estadoReparacion.js";
import { Op } from "sequelize";
import logger from "../helpers/logger.js";

export async function getInformePorFechas(req, res) {
  const { desde, hasta } = req.query;
  if (!desde || !hasta) {
    return res.status(400).json({ error: "Fechas requeridas" });
  }

  try {
    const reparaciones = await Reparaciones.findAll({
      where: {
        createdAt: { [Op.between]: [desde, hasta] },
      },
      include: [
        {
          model: EquipoInstalado,
          as: "equipoInstalado",
          include: [
            {
              model: Equipo,
              as: "equipo",
              include: [
                { model: Marca, as: "marca" },
                { model: Modelo, as: "modelo" },
              ],
            },
          ],
        },
        {
          model: Usuario,
          as: "tecnico",
          attributes: ["usuario"],
        },
        {
          model: ObservacionesReparaciones,
          as: "observaciones",
          attributes: ["createdAt", "observaciones", "EstadoReparacion"],
          include: [
            {
              model: Usuario,
              as: "tecnico",
              attributes: ["usuario"],
            },
          ],
          order: [["createdAt", "ASC"]],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    const resultado = reparaciones.map((rep) => {
      const equipo = rep.equipoInstalado?.equipo || {};
      const observaciones = (rep.observaciones || [])
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((obs, i) => {
          return {
            indice: `${i + 1})`,
            fecha: formatearFecha(obs.createdAt),
            tecnico: limpiarCampo(obs.tecnico?.usuario, "Sin técnico"),
            observacion: limpiarCampo(obs.observaciones, "Sin observación"),
            estado: formatearEstadoReparacion(obs.EstadoReparacion),
          };
        });

      return {
        fecha: formatearFecha(rep.createdAt),
        oficina: limpiarCampo(rep.equipoInstalado?.oficina, "Sin oficina"),
        marca: limpiarCampo(equipo.marca?.marca, "Sin marca"),
        modelo: limpiarCampo(equipo.modelo?.modelo, "Sin modelo"),
        pedido: limpiarCampo(rep.ObservacionPedido, "Sin pedido"),
        tecnicoAsignado: limpiarCampo(rep.tecnico?.usuario, "Sin técnico"),
        observaciones,
      };
    });

    res.json(resultado);
  } catch (err) {
    logger.error(`Error al generar informe por fechas: ${err.message}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
/******************************************************************************/

export async function getInformePorTecnico(req, res) {
  const { tecnico, desde, hasta } = req.query;
  if (!tecnico || !desde || !hasta) {
    return res.status(400).json({ error: "Técnico y fechas requeridos" });
  }

  try {
    const reparaciones = await Reparaciones.findAll({
      where: {
        createdAt: { [Op.between]: [desde, hasta] },
      },
      include: [
        {
          model: Usuario,
          as: "tecnico",
          where: { usuario: tecnico },
          attributes: ["usuario"],
        },
        {
          model: EquipoInstalado,
          as: "equipoInstalado",
          include: [
            {
              model: Equipo,
              as: "equipo",
              include: [
                { model: Marca, as: "marca" },
                { model: Modelo, as: "modelo" },
              ],
            },
          ],
        },
        {
          model: ObservacionesReparaciones,
          as: "observaciones",
          attributes: ["createdAt", "observaciones", "EstadoReparacion"],
          include: [
            {
              model: Usuario,
              as: "tecnico",
              attributes: ["usuario"],
            },
          ],
          order: [["createdAt", "ASC"]],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    const resultado = reparaciones.map((rep) => {
      const equipo = rep.equipoInstalado?.equipo || {};
      const observaciones = (rep.observaciones || [])
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((obs, i) => ({
          indice: `${i + 1})`,
          fecha: formatearFecha(obs.createdAt),
          tecnico: limpiarCampo(obs.tecnico?.usuario, "Sin técnico"),
          observacion: limpiarCampo(obs.observaciones, "Sin observación"),
          estado: formatearEstadoReparacion(obs.EstadoReparacion),
        }));

      return {
        fecha: formatearFecha(rep.createdAt),
        oficina: limpiarCampo(rep.equipoInstalado?.oficina, "Sin oficina"),
        marca: limpiarCampo(equipo.marca?.marca, "Sin marca"),
        modelo: limpiarCampo(equipo.modelo?.modelo, "Sin modelo"),
        pedido: limpiarCampo(rep.ObservacionPedido, "Sin pedido"),
        tecnicoAsignado: limpiarCampo(rep.tecnico?.usuario, "Sin técnico"),
        observaciones,
      };
    });

    res.json(resultado);
  } catch (err) {
    logger.error(`Error al generar informe por técnico: ${err.message}`);   
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
/******************************************************************************/

export async function getInformePorOficina(req, res) {
  const { oficina, desde, hasta } = req.query;
  if (!oficina || !desde || !hasta) {
    return res.status(400).json({ error: "Oficina y fechas requeridas" });
  }

  try {
    const reparaciones = await Reparaciones.findAll({
      where: {
        createdAt: { [Op.between]: [desde, hasta] },
      },
      include: [
        {
          model: EquipoInstalado,
          as: "equipoInstalado",
          where: { oficina },
          include: [
            {
              model: Equipo,
              as: "equipo",
              include: [
                { model: Marca, as: "marca" },
                { model: Modelo, as: "modelo" },
              ],
            },
          ],
        },
        {
          model: Usuario,
          as: "tecnico",
          attributes: ["usuario"],
        },
        {
          model: ObservacionesReparaciones,
          as: "observaciones",
          attributes: ["createdAt", "observaciones", "EstadoReparacion"],
          include: [
            {
              model: Usuario,
              as: "tecnico",
              attributes: ["usuario"],
            },
          ],
          order: [["createdAt", "ASC"]],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    const resultado = reparaciones.map((rep) => {
      const equipo = rep.equipoInstalado?.equipo || {};
      const observaciones = (rep.observaciones || [])
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((obs, i) => ({
          indice: `${i + 1})`,
          fecha: formatearFecha(obs.createdAt),
          tecnico: limpiarCampo(obs.tecnico?.usuario, "Sin técnico"),
          observacion: limpiarCampo(obs.observaciones, "Sin observación"),
          estado: formatearEstadoReparacion(obs.EstadoReparacion),
        }));

      return {
        fecha: formatearFecha(rep.createdAt),
        oficina: limpiarCampo(rep.equipoInstalado?.oficina, "Sin oficina"),
        marca: limpiarCampo(equipo.marca?.marca, "Sin marca"),
        modelo: limpiarCampo(equipo.modelo?.modelo, "Sin modelo"),
        pedido: limpiarCampo(rep.ObservacionPedido, "Sin pedido"),
        tecnicoAsignado: limpiarCampo(rep.tecnico?.usuario, "Sin técnico"),
        observaciones,
      };
    });

    res.json(resultado);
  } catch (err) {
    logger.error(`Error al generar informe por oficina: ${err.message}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}