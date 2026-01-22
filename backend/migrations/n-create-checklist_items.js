export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable("checklist_items", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    orden: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    frecuencia: {
      type: DataTypes.ENUM("mensual", "trimestral", "semestral", "anual"),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("checklist_items");
}