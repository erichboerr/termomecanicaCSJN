// src/model/Estado.js
import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Estado = db.define("estados", {
  idEstado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
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
  tableName: "estados",
  timestamps: true,
  paranoid: true, // si querés usar soft delete
});

export default Estado;
