import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const ChecklistItem = db.define("checklist_items", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  frecuencia: {
    type: DataTypes.ENUM("mensual", "trimestral", "semestral", "anual"),
    allowNull: false,
  },
}, {
  tableName: "checklist_items",
  timestamps: true,
  paranoid: true,
});

export default ChecklistItem;
