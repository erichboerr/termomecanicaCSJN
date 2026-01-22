import { sequelize, ChecklistItem, ChequeoDetalle } from "../models/index.js";

export const seedChecklistItems = async () => {
  const checklistItemsSeed = [
    {
      id: 1,
      descripcion: "Verificación estado estructuras, ménsulas y envolvente",
      frecuencia: "mensual",
      orden: 1,
      activo: true,
    },
    {
      id: 2,
      descripcion: "Verificación paneles y tapas de acceso",
      frecuencia: "mensual",
      orden: 2,
      activo: true,
    },
    {
      id: 3,
      descripcion: "Verificación presión alta y baja",
      frecuencia: "mensual",
      orden: 3,
      activo: true,
    },
    {
      id: 4,
      descripcion: "Verificación refrigerante",
      frecuencia: "mensual",
      orden: 4,
      activo: true,
    },
    {
      id: 5,
      descripcion: "Ausencia mancha de aceite",
      frecuencia: "mensual",
      orden: 5,
      activo: true,
    },
    {
      id: 6,
      descripcion: "Verificación de calefactor de cárter",
      frecuencia: "mensual",
      orden: 6,
      activo: true,
    },
    {
      id: 7,
      descripcion: "Verificación de ventiladores de condensador",
      frecuencia: "mensual",
      orden: 7,
      activo: true,
    },
    {
      id: 8,
      descripcion: "Limpieza filtro de aire",
      frecuencia: "mensual",
      orden: 8,
      activo: true,
    },
    {
      id: 9,
      descripcion: "Verificación estado de turbina evaporador",
      frecuencia: "mensual",
      orden: 9,
      activo: true,
    },
    {
      id: 10,
      descripcion: "Verificación de cañerias y conexiones",
      frecuencia: "trimestral",
      orden: 10,
      activo: true,
    },
    {
      id: 11,
      descripcion: "Verificación sistema de drenaje de condensado",
      frecuencia: "trimestral",
      orden: 11,
      activo: true,
    },
    {
      id: 12,
      descripcion:
        "Verificación y evaluación de termográfica de tablero eléctrico",
      frecuencia: "trimestral",
      orden: 12,
      activo: true,
    },
    {
      id: 13,
      descripcion: "Verificación de estado bandeja de recolección de agua",
      frecuencia: "trimestral",
      orden: 13,
      activo: true,
    },
    {
      id: 14,
      descripcion: "Verificación de condensador",
      frecuencia: "trimestral",
      orden: 14,
      activo: true,
    },
    {
      id: 15,
      descripcion: "Verificación del estado de bomba de desagote",
      frecuencia: "trimestral",
      orden: 15,
      activo: true,
    },
    {
      id: 16,
      descripcion: "Medición de corriente al compresor (AMP)",
      frecuencia: "trimestral",
      orden: 16,
      activo: true,
    },
    {
      id: 17,
      descripcion: "Medición de corriente al ventilador (AMP)",
      frecuencia: "trimestral",
      orden: 17,
      activo: true,
    },
    {
      id: 18,
      descripcion: "Verificación de pintura",
      frecuencia: "semestral",
      orden: 18,
      activo: true,
    },
    {
      id: 19,
      descripcion: "Verificación estado válvula de expansión termostática o electrónica",
      frecuencia: "semestral",
      orden: 19,
      activo: true,
    },
    {
      id: 20,
      descripcion: "Limpieza general de equipo",
      frecuencia: "semestral",
      orden: 20,
      activo: true,
    },
    {
      id: 21,
      descripcion:
        "Verificación y controles: Sensores, Termostatos y Controles remotos",
      frecuencia: "semestral",
      orden: 21,
      activo: true,
    },
    {
      id: 22,
      descripcion: "Verificación Aislamiento eléctrico",
      frecuencia: "anual",
      orden: 22,
      activo: true,
    },
    {
      id: 23,
      descripcion: "Limpieza serpentina del evaporador",
      frecuencia: "anual",
      orden: 23,
      activo: true,
    },
  ];

  try {
    // Primero truncar detalles (dependen de chequeos)
    await sequelize.query(
      'TRUNCATE TABLE "chequeos_detalles" RESTART IDENTITY CASCADE;'
    );

    // Luego truncar chequeos (padre de detalles)
    await sequelize.query(
      'TRUNCATE TABLE "chequeos" RESTART IDENTITY CASCADE;'
    );

    // Finalmente truncar checklist_items
    await sequelize.query(
      'TRUNCATE TABLE "checklist_items" RESTART IDENTITY CASCADE;'
    );

    // Inserción estable con IDs fijos
    for (const item of checklistItemsSeed) {
      await ChecklistItem.upsert(item);
    }

    await sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence('checklist_items', 'id'),
      COALESCE((SELECT MAX(id) FROM checklist_items), 1),
      true
    );
  `);

    console.log("✅ Ítems de checklist insertados y secuencia estable.");
  } catch (error) {
    console.error("❌ Error al cargar seeds:", error.message);
  }
};
