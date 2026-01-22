import multer from "multer";
import path from "path";
import sanitizeFilename from "sanitize-filename";

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, path.join("uploads", "photos")),
  filename: (_, file, cb) => {
    const timestamp = Date.now();
    const cleanName = sanitizeFilename(file.originalname);
    cb(null, `${timestamp}-${cleanName}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Solo se permiten imágenes"));
    }
    cb(null, true);
  },
});

export default upload;