import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import logger from "../helpers/logger.js";

export const compressAndSave = async (file, outputDir) => {
  const timestamp = Date.now();
  const cleanName = file.originalname.replace(/\s+/g, "_");
  const outputName = `${timestamp}-${cleanName}`;
  const outputPath = path.join(outputDir, outputName);

  try {
    // Procesar y guardar la imagen comprimida
    await sharp(file.path)
      .resize({ width: 1024 })
      .toFormat("jpeg", { quality: 80 })
      .toFile(outputPath);

    // Esperar un pequeño delay antes de eliminar el original
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Eliminar el archivo original solo si es diferente al destino
    if (file.path !== outputPath) {
      await fs.unlink(file.path);
    }
    return `/uploads/photos/${outputName}`;
  } catch (err) {
    logger.error(`Error al comprimir y guardar imagen: ${err.message}`);
    //console.error("Error al comprimir y guardar imagen:", err);
    throw err;
  }
};