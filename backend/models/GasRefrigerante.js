// src/model/GasRefrigerante.js
import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const GasRefrigerante = db.define("gas_refrigerantes", {
  idGasRefrigerante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  gasRefrigerante: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  flagHabilitado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "gas_refrigerantes",
  timestamps: true,
  paranoid: true,
});

export default GasRefrigerante;