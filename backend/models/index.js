import db from "../dataBase/db.js";

// 📦 Importación de modelos
import Usuario from "./Usuario.js";
import Rol from "./Rol.js";
import TipoEquipo from "./TipoEquipo.js";
import Equipo from "./Equipo.js";
import Marca from "./Marca.js";
import Modelo from "./Modelo.js";
import Alimentacion from "./Alimentacion.js";
import Potencia from "./Potencia.js";
import Capacidad from "./Capacidad.js";
import GasRefrigerante from "./GasRefrigerante.js";
import Estado from "./Estado.js";
import Locacion from "./Locacion.js";
import EquipoInstalado from "./EquipoInstalado.js";
import Reparaciones from "./Reparaciones.js";
import ObservacionesReparaciones from "./ObservacionesReparaciones.js";
import ChecklistItem from "./checklist_item.js";
import Chequeo from "./chequeo.js";
import ChequeoDetalle from "./chequeosdetalles.js";

// 🔗 Asociaciones

// Usuario - Rol
Rol.hasMany(Usuario, { foreignKey: "idRol", as: "usuarios" });
Usuario.belongsTo(Rol, { foreignKey: "idRol", as: "rol" });

// Equipo - Relaciones
Equipo.belongsTo(TipoEquipo, { foreignKey: "idTipoEquipo", as: "tipoEquipo" });
Equipo.belongsTo(Marca, { foreignKey: "idMarca", as: "marca" });
Equipo.belongsTo(Modelo, { foreignKey: "idModelo", as: "modelo" });
Equipo.belongsTo(Alimentacion, {
  foreignKey: "idAlimentacion",
  as: "alimentacion",
});
Equipo.belongsTo(Potencia, { foreignKey: "idPotencia", as: "potencia" });
Equipo.belongsTo(Capacidad, { foreignKey: "idCapacidad", as: "capacidad" });
Equipo.belongsTo(GasRefrigerante, {
  foreignKey: "idGasRefrigerante",
  as: "gasRefrigerante",
});

// Relaciones inversas
TipoEquipo.hasMany(Equipo, { foreignKey: "idTipoEquipo", as: "equipos" });
Marca.hasMany(Equipo, { foreignKey: "idMarca", as: "equipos" });
Modelo.hasMany(Equipo, { foreignKey: "idModelo", as: "equipos" });
Alimentacion.hasMany(Equipo, { foreignKey: "idAlimentacion", as: "equipos" });
Potencia.hasMany(Equipo, { foreignKey: "idPotencia", as: "equipos" });
Capacidad.hasMany(Equipo, { foreignKey: "idCapacidad", as: "equipos" });
GasRefrigerante.hasMany(Equipo, {
  foreignKey: "idGasRefrigerante",
  as: "equipos",
});

// EquipoInstalado - Relaciones
EquipoInstalado.belongsTo(Locacion, {
  foreignKey: "idLocacion",
  as: "locacion",
});
EquipoInstalado.belongsTo(Equipo, { foreignKey: "idEquipo", as: "equipo" });
EquipoInstalado.belongsTo(Estado, { foreignKey: "idEstado", as: "estado" });

// Relaciones inversas
Locacion.hasMany(EquipoInstalado, {
  foreignKey: "idLocacion",
  as: "locacionEquipos",
});

Equipo.hasMany(EquipoInstalado, {
  foreignKey: "idEquipo",
  as: "instalaciones",
});
Estado.hasMany(EquipoInstalado, {
  foreignKey: "idEstado",
  as: "equiposInstalados",
});

EquipoInstalado.hasMany(Reparaciones, {
  foreignKey: "idEquipoInstalado",
  as: "reparaciones",
});
Usuario.hasMany(Reparaciones, {
  foreignKey: "idTecnico",
  as: "reparacionesTecnico",
});
Usuario.hasMany(Reparaciones, {
  foreignKey: "idSupervisor",
  as: "reparacionesSupervisor",
});

// Reparaciones - Relaciones
Reparaciones.belongsTo(EquipoInstalado, {
  foreignKey: "idEquipoInstalado",
  as: "equipoInstalado",
});

Reparaciones.belongsTo(Usuario, {
  foreignKey: "idTecnico",
  as: "tecnico",
});

Reparaciones.belongsTo(Usuario, {
  foreignKey: "idSupervisor",
  as: "supervisor",
});

Reparaciones.hasMany(ObservacionesReparaciones, {
  foreignKey: "idReparaciones",
  as: "observaciones",
});

// ObservacionesReparaciones - Relaciones
ObservacionesReparaciones.belongsTo(Reparaciones, {
  foreignKey: "idReparaciones",
  as: "reparacion",
});
ObservacionesReparaciones.belongsTo(Usuario, {
  foreignKey: "idTecnicos",
  as: "tecnico",
});
Usuario.hasMany(ObservacionesReparaciones, {
  foreignKey: "idTecnicos",
  as: "observacionesTecnico",
});

// 🔗 Chequeo - Relaciones
Chequeo.belongsTo(Equipo, { foreignKey: "equipoId", as: "equipo" });
Chequeo.belongsTo(Usuario, { foreignKey: "usuarioId", as: "tecnico" });

Equipo.hasMany(Chequeo, { foreignKey: "equipoId", as: "chequeos" });
Usuario.hasMany(Chequeo, { foreignKey: "usuarioId", as: "chequeosRealizados" });

// 🔗 ChequeoDetalle - Relaciones
ChequeoDetalle.belongsTo(Chequeo, { foreignKey: "chequeoId", as: "chequeo" });
ChequeoDetalle.belongsTo(ChecklistItem, { foreignKey: "itemsId", as: "item" });

Chequeo.hasMany(ChequeoDetalle, { foreignKey: "chequeoId", as: "detalles" });
ChecklistItem.hasMany(ChequeoDetalle, { foreignKey: "itemsId", as: "usos" });

// 🧩 Crear objeto de modelos
const models = {
  Usuario,
  Rol,
  TipoEquipo,
  Equipo,
  Marca,
  Modelo,
  Alimentacion,
  Potencia,
  Capacidad,
  GasRefrigerante,
  Estado,
  Locacion,
  EquipoInstalado,
  Reparaciones,
  ObservacionesReparaciones,
  ChecklistItem,
  Chequeo,
  ChequeoDetalle,
};

// 🔍 Log visual de relaciones
//logRelaciones(models);

// 🚀 Exportación centralizada
export {
  db as sequelize,
  Usuario,
  Rol,
  Locacion,
  Equipo,
  Marca,
  Modelo,
  Alimentacion,
  Potencia,
  Capacidad,
  GasRefrigerante,
  Estado,
  TipoEquipo,
  EquipoInstalado,
  Reparaciones,
  ObservacionesReparaciones,
  ChecklistItem,
  Chequeo,
  ChequeoDetalle,
};
