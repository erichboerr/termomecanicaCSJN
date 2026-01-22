import { ChecklistItem, Chequeo, ChequeoDetalle } from "../models/index.js";

// POST /accionesPreventivas
export const registrarAccionPreventiva = async (req, res) => {
  try {
    const {
      fecha,
      oficina,
      marca,
      modelo,
      serie,
      tipo,
      usuarioId,
      equipoId,
      frecuencia_aplicada,
      detalles = [],
    } = req.body;

    // Validaciones defensivas
    if (!fecha || !oficina || !marca || !modelo || !serie || !tipo) {
      return res
        .status(400)
        .json({ error: "Faltan datos del encabezado del chequeo" });
    }

    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth() + 1;
    const year = fechaObj.getFullYear();

    // 👇 lógica de periodo: noviembre y diciembre pertenecen al año siguiente
    const periodo = mes >= 11 ? year + 1 : year;

    // Crear chequeo
    const chequeo = await Chequeo.create({
      fecha,
      oficina,
      marca,
      modelo,
      serie,
      tipo,
      usuarioId: Number(usuarioId),
      equipoId: Number(equipoId),
      frecuencia_aplicada,
      periodo, // 👈 guardamos periodo
    });

    // Crear detalles
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
    const { oficina, fecha, frecuencia, serie } = req.query;
    console.log("validarChecklistItems params:", {
      oficina,
      fecha,
      frecuencia,
      serie,
    });

    if (!oficina || !fecha || !frecuencia) {
      return res.status(400).json({ error: "Parámetros incompletos" });
    }

    function calcularPeriodoPreventivo(fecha) {
      const [y, m] = fecha.split("-").map(Number);
      // Si el mes es noviembre (11) o diciembre (12), pertenece al periodo siguiente
      return m >= 11 ? y + 1 : y;
    }

    const [y, m, d] = fecha.split("-").map(Number);
    if (!y || !m || !d) {
      return res.status(400).json({ error: "Fecha inválida. Use YYYY-MM-DD" });
    }
    /*console.log("Oficina recibida:", oficina);
    console.log("Fecha recibida:", fecha);
    console.log("Frecuencia recibida:", frecuencia);
    console.log("Serie recibida:", serie);*/

    const periodoPreventivo = calcularPeriodoPreventivo(fecha);

    const duplicado = await Chequeo.findOne({
      where: {
        oficina,
        frecuencia_aplicada: frecuencia,
        periodo: periodoPreventivo,
        serie,
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
      const { marca, modelo, serie } = duplicado;
      return res.status(400).json({
        error: `Ya existe un registro para Oficina: ${oficina}, Marca: ${marca}, Modelo: ${modelo}, Serie: ${serie}, en el mes ${m} del ${y}`,
      });
    }

    res.json({ ok: true, mesAplicado: m, year: y });
  } catch (error) {
    console.error("validarChecklistItems error:", error);
    res.status(500).json({ error: "Error al validar checklistItems" });
  }
};
