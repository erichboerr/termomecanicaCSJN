// src/model/Alimentacion.js
import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Alimentacion = db.define("alimentaciones", {
  idAlimentacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  alimentacion: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: "alimentaciones",
  timestamps: true,
  paranoid: true,
});

export default Alimentacion;
