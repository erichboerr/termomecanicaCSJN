import {
  Alimentacion,
  Estado,
  Rol,
  Capacidad,
  Usuario,
  Locacion,
  TipoEquipo,
} from "../models/index.js";

export const cargarSeeds = async () => {
  try {
    await seedAlimentacion();
    await seedEstado();
    await seedRoles();
    await seedCapacidades();
    await seedLocaciones();
    await seedtipoEquipos();
    await seedUsuario();
  } catch (error) {
    console.error("❌ Error al cargar seeds:", error.message);
  }
};

const seedAlimentacion = async () => {
  const alimentaciones = ["220V", "380V"];
  for (const alimentacion of alimentaciones) {
    await Alimentacion.findOrCreate({ where: { alimentacion } });
  }
  console.log("🌱 Alimentaciones cargadas");
};

const seedEstado = async () => {
  const estados = [
    "OPERATIVO",
    "MANTENIMIENTO",
    "URGENTE",
    "FUERA DE SERVICIO",
  ];
  for (const estado of estados) {
    await Estado.findOrCreate({ where: { estado } });
  }
  console.log("🌱 Estados cargados");
};

const seedRoles = async () => {
  const roles = [
    "Administrador",
    "Supervisor Teknik",
    "Supervisor CSJN",
    "Técnico",
    "Cliente",
    "Preventivo",
  ];
  for (const rol of roles) {
    await Rol.findOrCreate({ where: { rol } });
  }
  console.log("🌱 Roles cargados");
};

const seedCapacidades = async () => {
  const capacidades = ["2200", "3000", "4500", "6000", "3 TR", "6 TR"];
  for (const capacidad of capacidades) {
    await Capacidad.findOrCreate({ where: { capacidad } });
  }
  console.log("🌱 Capacidades cargadas");
};

const seedLocaciones = async () => {
  const locaciones = ["CSJN"];
  for (const locacion of locaciones) {
    await Locacion.findOrCreate({ where: { locacion } });
  }
  console.log("🌱 Locaciones cargadas");
};

const seedtipoEquipos = async () => {
  const tipoEquipos = ["SPLIT"];
  for (const tipoEquipo of tipoEquipos) {
    await TipoEquipo.findOrCreate({ where: { tipoEquipo } });
  }
  console.log("🌱 Locaciones cargadas");
};

const seedUsuario = async () => {
  const usuariosSeed = [
    {
      usuario: "Administrador",
      password: "$2b$10$CuFpWngA45nDYO39Kg7TQOoHPHyjATcsBKKaC5c8RREGs7O4k8WUe",
      flagHabilitado: true,
      idRol: 1,
    },
    {
      usuario: "Supervisor Teknik",
      password: "$2b$10$w0ibyMRhKg278EHmogWmD.QAlAYWZ9RZpvddcCoYEsHdTMnFZwbuS",
      flagHabilitado: true,
      idRol: 2,
    },
    {
      usuario: "Supervisor CSJN",
      password: "$2b$10$SATOh3YR6PrS5lVrsrZhEerg9jTSdnlTJOcwvJZ/Vo36e3FRFSQVK",
      flagHabilitado: true,
      idRol: 3,
    },
    {
      usuario: "Tecnico",
      password: "$2b$10$QcnVc1o15ccWQ0c7Tzv4puynM2P13fGQXV8lhfWJndfIL1ojSlBNq",
      flagHabilitado: true,
      idRol: 4,
    },
    {
      usuario: "Cliente",
      password: "$2b$10$Bh2.BeU7rk4ld3rdr7MPPe2s86Trb4Y6rhlb5PRLEmP3Rl3FRAr4a",
      flagHabilitado: true,
      idRol: 5,
    },
    {
      usuario: "Preventivo",
      password: "$2b$10$GuoVx4zymWEo3x3vS2Qmg.JOnEVvM7bCIQ8k1crwUDxqCoWKXMx4u",
      flagHabilitado: true,
      idRol: 6,
    },
  ];

  for (const u of usuariosSeed) {
    const [user, created] = await Usuario.findOrCreate({
      where: { usuario: u.usuario },
      defaults: u,
    });

    console.log(
      created
        ? `👤 Usuario ${u.usuario} creado exitosamente`
        : `👤 Usuario ${u.usuario} ya existe`
    );
  }
};

