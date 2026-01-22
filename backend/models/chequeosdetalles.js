import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const ChequeoDetalle = db.define("chequeos_detalles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chequeoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  itemsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: true, // null si es AMP
  },
  valor: {
    type: DataTypes.STRING,
    allowNull: true, // solo para AMP
  },
  mes_aplicado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "chequeos_detalles",
  timestamps: true,
  paranoid: true,
});

export default ChequeoDetalle;
