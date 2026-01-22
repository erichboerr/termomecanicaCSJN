// src/model/Marca.js
import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Marca = db.define("marcas", {
  idMarca: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  marca: {
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
  tableName: "marcas",
  timestamps: true,
  paranoid: true, 
});

export default Marca;
