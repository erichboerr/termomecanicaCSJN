// src/model/Usuario.js
import { DataTypes } from 'sequelize';
import db from '../dataBase/db.js';

const Usuario = db.define('usuarios', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flagHabilitado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  tableName: 'usuarios',
});

export default Usuario;