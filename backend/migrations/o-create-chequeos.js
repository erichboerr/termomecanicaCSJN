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
    oficina: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
