
// src/model/Equipo.js
import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Equipo = db.define("equipos", {
  idEquipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  flagHabilitado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "equipos",
  timestamps: true,
  paranoid: true,
});

export default Equipo;