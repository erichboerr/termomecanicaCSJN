// migrations/XXXX-create-chequeos_detalles.js
export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable("chequeos_detalles", {
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
      allowNull: true,
    },
    valor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mes_aplicado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("chequeos_detalles");
}