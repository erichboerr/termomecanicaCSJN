import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import db from "./dataBase/db.js";
import "./models/index.js";
import rutas from "./routes/Routes.js";
import { cargarSeeds } from "./seedDB/cargarSeeds.js";
import { seedChecklistItems } from "./seedDB/seedChekListItems.js";
import { fileURLToPath } from "url";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const envPath =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 5050;
const isProduction = process.env.NODE_ENV === "production";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧠 Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🛡️ Seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://ui-avatars.com"],
      fontSrc: ["'self'", "https:", "data:"],
      connectSrc: ["'self'", "https://cdn.jsdelivr.net"],
    },
  },
}));

// 🖼️ Archivos estáticos uploads
app.use("/uploads", (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Demasiados intentos. Intentá de nuevo en 15 minutos." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/login", loginLimiter);

if (isProduction) {
  const corsOptions = {
    origin: [
      "https://termomecanicacsjn.com",
      "https://www.termomecanicacsjn.com",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
} else {
  const whiteList = ["http://localhost:5173"];
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Error de CORS: Origen no permitido."));
    },
  };
  app.use(cors(corsOptions));
}

const ensureUploadDirs = () => {
  const photosPath = path.join(process.cwd(), "uploads", "photos");
  if (!fs.existsSync(photosPath)) {
    fs.mkdirSync(photosPath, { recursive: true });
    console.log("📁 Carpeta creada:", photosPath);
  }
};

ensureUploadDirs();

// 🖼️ Archivos estáticos uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Frontend estático ANTES de las rutas API
if (isProduction) {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(frontendPath));
}

// 🚀 Rutas API
app.use(rutas);

// ✅ Fallback React Router DESPUÉS de las rutas API
if (isProduction) {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// 🔗 Conexión y sincronización
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
  console.log(`🧪 Entorno activo: ${process.env.NODE_ENV}`);
  console.log("🌐 Backend:", process.env.BACKEND_URL);

  try {
    await db.authenticate();
    console.log("✅ Base de datos conectada");

    if (process.env.DB_SYNC === "true") {
      await db.sync({ force: true });
      console.log("🛠️ Base de datos sincronizada");
    }
    if (process.env.DB_SEED === "true") {
      await cargarSeeds();
      await seedChecklistItems();
      console.log("🌱 seeders cargados");
    }
  } catch (err) {
    console.error("❌ Error con la base de datos:", err.message);
  }
});