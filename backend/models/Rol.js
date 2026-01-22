import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Rol = db.define("roles", {
  idRol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rol: {
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
  timestamps: true,
  tableName: "roles",
});

export default Rol;
