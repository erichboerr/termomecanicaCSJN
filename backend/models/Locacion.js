import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Location = db.define("locaciones", {
  idLocacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  locacion: {
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
  tableName: "locaciones",
  timestamps: true,
  paranoid: true, 
});

export default Location;
