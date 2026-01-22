import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const EquipoInstalado = db.define("equipos_instalados", {
  idEquipoInstalado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serie: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  oficina: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto1Path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto2Path: {
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: "equipos_instalados",
  timestamps: true,
  paranoid: true,
});

export default EquipoInstalado;

