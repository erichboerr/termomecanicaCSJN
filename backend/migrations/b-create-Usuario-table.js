"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "usuarios",
      {
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
          type: Sequelize.INTEGER,
          references: {
            model: "roles", // Nombre de la tabla de destino
            key: "idRol", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
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
        timestamps: true,
        tableName: "usuarios",
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuarios");
  },
};
