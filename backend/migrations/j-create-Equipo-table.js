"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "equipos",
      {
        idEquipo: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        idTipoEquipo: {
          type: Sequelize.INTEGER,
          references: {
            model: "tipoEquipos", // Nombre de la tabla de destino
            key: "idTipoEquipo", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
         idMarca: {
          type: Sequelize.INTEGER,
          references: {
            model: "marcas", // Nombre de la tabla de destino
            key: "idMarca", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        idModelo: {
          type: Sequelize.INTEGER,
          references: {
            model: "modelos", // Nombre de la tabla de destino
            key: "idModelo", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        idAlimentacion: {
          type: Sequelize.INTEGER,
          references: {
            model: "alimentaciones", // Nombre de la tabla de destino
            key: "idAlimentacion", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        idPotencia: {
          type: Sequelize.INTEGER,
          references: {
            model: "potencias", // Nombre de la tabla de destino
            key: "idPotencia", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        idCapacidad: {
          type: Sequelize.INTEGER,
          references: {
            model: "capacidades", // Nombre de la tabla de destino
            key: "idCapacidad", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        idGasRefrigerante: {
          type: Sequelize.INTEGER,
          references: {
            model: "gas_refrigerantes", // Nombre de la tabla de destino
            key: "idGasRefrigerante", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        flagHabilitado: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
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
        tableName: "equipos",
        timestamps: true,
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("equipos");
  },
};
