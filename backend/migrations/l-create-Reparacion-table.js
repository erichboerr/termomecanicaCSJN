"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "reparaciones",
      {
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
          references: {
            model: "usuarios",
            key: "idUsuario",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        idSupervisor: {
          type: DataTypes.INTEGER,
          references: {
            model: "usuarios", // Nombre de la tabla de referencia
            key: "idUsuario", // Nombre de la columna de referencia en la tabla 'equipos'
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        idEquipoInstalado: {
          type: DataTypes.INTEGER,
          references: {
            model: "equipos_instalados", // Nombre de la tabla de referencia
            key: "idEquipoInstalado", // Nombre de la columna de referencia en la tabla 'equipos'
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        Finalizado: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
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
        timestamps: true,
        tableName: "reparaciones",
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reparaciones");
  },
};
