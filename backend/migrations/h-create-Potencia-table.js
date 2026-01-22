"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "potencias",
      {
        idPotencia: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        potencia: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
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
        tableName: "potencias",
        timestamps: true,
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("potencias");
  },
};
