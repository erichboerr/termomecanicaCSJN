"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "equipos_instalados",
      {
        idEquipoInstalado: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        idLocacion: {
          type: Sequelize.INTEGER,
          references: {
            model: "locaciones", // Nombre de la tabla de destino
            key: "idLocacion", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },  
        idEquipo: {
          type: Sequelize.INTEGER,
          references: {
            model: "equipos", // Nombre de la tabla de destino
            key: "idEquipo", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        idEstado: {
          type: Sequelize.INTEGER,
          references: {
            model: "estados", // Nombre de la tabla de destino
            key: "idEstado", // Clave primaria de la tabla de destino
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        serie: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        oficina: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        observaciones: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        foto1Path: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        foto2Path: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        flagHabilitado: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
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
        tableName: "equipos_instalados",
        timestamps: true,
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("equipos_instalados");
  },
};
