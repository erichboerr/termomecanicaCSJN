import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const TipoEquipo = db.define("tipoEquipos", {
  idTipoEquipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipoEquipo: {
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
  tableName: "tipoEquipos",
  timestamps: true,
  paranoid: true, 
});

export default TipoEquipo;
