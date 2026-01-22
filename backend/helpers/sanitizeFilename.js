import path from "path";

export function sanitizeFilename(originalName) {
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext);

  const sanitizedBase = base
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/[^a-zA-Z0-9]/g, "-") // reemplaza caracteres raros
    .replace(/-+/g, "-") // evita múltiples guiones
    .toLowerCase();

  return `${Date.now()}-${sanitizedBase}${ext}`;
}