import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const ObservacionesReparaciones = db.define("observaciones_reparaciones", {
  idObsRep: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idReparaciones: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idTecnicos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  EstadoReparacion: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
},
}, {
  tableName: "observaciones_reparaciones",
  timestamps: true,
});

export default ObservacionesReparaciones;



