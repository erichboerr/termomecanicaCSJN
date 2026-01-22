import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Chequeo = db.define(
  "chequeos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    oficina: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    equipoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    periodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frecuencia_aplicada: {
      type: DataTypes.ENUM("mensual", "trimestral", "semestral", "anual"),
      allowNull: false,
    },
  },
  {
    tableName: "chequeos",
    timestamps: true,
    paranoid: true,
  }
);

export default Chequeo;
