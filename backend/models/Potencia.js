// src/model/Potencia.js
import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Potencia = db.define('potencias', {
  idPotencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  potencia: {
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
  tableName: 'potencias',
  timestamps: true,
});

export default Potencia;