// src/model/Reparaciones.js
import { DataTypes } from "sequelize";
import db from "../dataBase/db.js";

const Reparaciones = db.define("reparaciones", {
  idReparaciones: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ObservacionPedido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idTecnico: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idSupervisor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idEquipoInstalado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  Finalizado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
},
  createdAt: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
  tableName: "reparaciones",
});

export default Reparaciones;
