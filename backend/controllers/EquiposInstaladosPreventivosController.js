import { ChecklistItem, Chequeo, ChequeoDetalle } from "../models/index.js";

// POST /accionesPreventivas
export const registrarAccionPreventiva = async (req, res) => {
  try {
    const {
      idEquipoInstalado,
      usuarioId,
      equipoId,
      fecha,
      frecuencia_aplicada,
      detalles = [],
    } = req.body;

    if (!idEquipoInstalado || !usuarioId || !fecha || !frecuencia_aplicada) {
      return res.status(400).json({ error: "Faltan datos del encabezado del chequeo" });
    }

    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth() + 1;
    const year = fechaObj.getFullYear();
    const periodo = mes >= 11 ? year + 1 : year;

    const chequeo = await Chequeo.create({
      fecha,
      idEquipoInstalado: Number(idEquipoInstalado),
      usuarioId: Number(usuarioId),
      equipoId: Number(equipoId),
      frecuencia_aplicada,
      periodo,
    });

    const mesAplicado = mes;
    const detallesData = detalles.map((d) => ({
      chequeoId: chequeo.id,
      itemsId: d.itemId,
      estado: typeof d.estado === "boolean" ? d.estado : null,
      valor: typeof d.valor === "string" ? d.valor : null,
      mes_aplicado: mesAplicado,
    }));

    if (detallesData.length > 0) {
      await ChequeoDetalle.bulkCreate(detallesData);
    }

    res.json({
      message: "✅ Acción preventiva registrada",
      chequeoId: chequeo.id,
      periodo,
    });
  } catch (error) {
    console.error("❌ Error al registrar acción preventiva:", error);
    res.status(500).json({ error: error.message });
  }
};

export const obtenerChecklistItems = async (req, res) => {
  try {
    const { frecuencia } = req.query;
    const where = frecuencia ? { frecuencia } : {};

    const items = await ChecklistItem.findAll({
      where,
      order: [["orden", "ASC"]],
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener checklistItems" });
  }
};

// GET /checklistItems
export const validarChecklistItems = async (req, res) => {
  try {
    const { idEquipoInstalado, fecha, frecuencia } = req.query;

    if (!idEquipoInstalado || !fecha || !frecuencia) {
      return res.status(400).json({ error: "Parámetros incompletos" });
    }

    const [y, m, d] = fecha.split("-").map(Number);
    if (!y || !m || !d) {
      return res.status(400).json({ error: "Fecha inválida. Use YYYY-MM-DD" });
    }

    const periodo = m >= 11 ? y + 1 : y;

    const duplicado = await Chequeo.findOne({
      where: {
        idEquipoInstalado: Number(idEquipoInstalado),
        frecuencia_aplicada: frecuencia,
        periodo,
      },
      include: [
        {
          model: ChequeoDetalle,
          as: "detalles",
          where: { mes_aplicado: m },
        },
      ],
    });

    if (duplicado) {
      return res.status(400).json({
        error: `Ya existe un registro para este equipo en el mes ${m} del ${y}`,
      });
    }

    res.json({ ok: true, mesAplicado: m, year: y });
  } catch (error) {
    console.error("validarChecklistItems error:", error);
    res.status(500).json({ error: "Error al validar checklistItems" });
  }
};
