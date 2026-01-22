// src/model/Modelo.js
import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Modelo = db.define("modelos", {
  idModelo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flagHabilitado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  idMarca: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  tableName: "modelos",
  timestamps: true,
  paranoid: true,
});

export default Modelo;