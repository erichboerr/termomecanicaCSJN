"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "observaciones_reparaciones",
      {
        idObsRep: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        observaciones: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        idReparaciones: {
        type: DataTypes.INTEGER,
        references: {
          model: 'reparaciones', // Nombre de la tabla de referencia
          key: 'idReparaciones', // Nombre de la columna de referencia en la tabla 'equipos'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
        idTecnicos: {
        type: DataTypes.INTEGER,
        references: {
          model: 'usuarios', // Nombre de la tabla de referencia
          key: 'idUsuario', // Nombre de la columna de referencia en la tabla 'equipos'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
        EstadoReparacion: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        tableName: "observaciones_reparaciones",
        timestamps: true,
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("observaciones_reparaciones");
  },
};
