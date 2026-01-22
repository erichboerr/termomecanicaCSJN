// utils/logRelaciones.js
export const logRelaciones = (models) => {
  Object.entries(models).forEach(([name, model]) => {
    console.log(`🔗 Modelo: ${name}`);
    if (model.associations) {
      Object.entries(model.associations).forEach(([alias, assoc]) => {
        console.log(`   ↪ ${alias}: ${assoc.associationType} → ${assoc.target.name}`);
      });
    }
  });
};