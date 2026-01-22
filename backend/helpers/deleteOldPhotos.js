import fs from "fs";
import path from "path";

const logResultado = (key, fullPath, err) => {
  if (err) {
    console.warn(`⚠️ No se pudo eliminar ${key}:`, err.message);
  } else {
    console.log(`🧹 ${key} eliminada:`, fullPath);
  }
};

export const deleteOldPhotos = (equipo) => {
  const baseDir = path.resolve("uploads", "photos");

  ["foto1Path", "foto2Path"].forEach((key) => {
    const fotoPath = equipo[key];
    if (!fotoPath) return;

    const filename = path.basename(fotoPath);
    const fullPath = path.join(baseDir, filename);

    fs.rm(fullPath, { force: true }, (err) => logResultado(key, fullPath, err));
  });
};