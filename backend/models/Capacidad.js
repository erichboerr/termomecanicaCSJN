import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Capacidad = db.define("capacidades", {
  idCapacidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  capacidad: {
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
  tableName: "capacidades",
  timestamps: true,
  paranoid: true,
});

export default Capacidad;