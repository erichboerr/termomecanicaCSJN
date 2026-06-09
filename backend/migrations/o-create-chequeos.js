export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable("chequeos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    idEquipoInstalado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "equipos_instalados",
        key: "idEquipoInstalado",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "idUsuario",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    equipoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    periodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frecuencia_aplicada: {
      type: DataTypes.ENUM("mensual", "trimestral", "semestral", "anual"),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("chequeos");
}