import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { buscarEstado } from "../controllers/EstadoController.js";
import {
  crearUsuario,
  getUsuariosHabilitados,
  updateUsuario,
  loginUsuario,
  getTecnico,
  obtenerTecnicos,
  actualizarPassword,
} from "../controllers/UsuarioController.js";
import { createRole } from "../controllers/RolesController.js";
import { getAllSelectOptions } from "../controllers/selectController.js";
import { addSelectOption } from "../controllers/selectController.js";
import {
  createEquipo,
  buscarPorMarcaModelo,
  obtenerCapacidadesPorModelo,
} from "../controllers/EquipoController.js";
import {
  createEquipoInstalado,
  getEquiposInstalados,
  aplicarAccion,
  actualizarEstadoEquipo,
  bajaEquiposInstalados,
  getEquipoPorOficina,
  actualizarFotosEquipo,
  getEquipoInstaladoById,
  getPreventivoPlanilla,
} from "../controllers/EquipoInstaladoController.js";
import { getRoles } from "../controllers/RolesController.js";
import {
  crearReparacion,
  asignarTecnico,
  reparacionConDetalles,
  createObservacionesReparaciones,
  finalizarReparacion,
} from "../controllers/ReparacionesController.js";
import {
  getInformePorFechas,
  getInformePorTecnico,
  getInformePorOficina,
} from "../controllers/ReportesController.js";
import upload from "../middleware/uploads.js";
import { getLogs } from "../helpers/getLogs.js";
import {
  registrarAccionPreventiva,
  obtenerChecklistItems,
  validarChecklistItems,
} from "../controllers/EquiposInstaladosPreventivosController.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// ✅ Rutas públicas — ANTES del middleware global
router.post("/login", loginUsuario);
router.get("/oficinas/:oficina", getEquipoPorOficina); // usada por QR público
router.get("/equipoDetalle/:id", getEquipoInstaladoById); // usada por QR público

// 🔒 Todo lo demás requiere token
router.use(authMiddleware);

// Posts
router.post("/createUser", crearUsuario);
router.post("/createRol", createRole);
router.post("/select/:key", addSelectOption);
router.post("/equipos", createEquipo);
router.post(
  "/createEquipoInstalado",
  upload.array("fotos", 2),
  createEquipoInstalado,
);
router.post("/accion", aplicarAccion);
router.post("/crearReparacion", crearReparacion);
router.post("/observacionesReparacion", createObservacionesReparaciones);
router.post("/finalizarReparacion", finalizarReparacion);
router.post("/accionesPreventivas", registrarAccionPreventiva);

// Gets
router.get("/usuarios/habilitados", getUsuariosHabilitados);
router.get("/options", getAllSelectOptions);
router.get("/equipos/buscarMarcaModelo", buscarPorMarcaModelo);
router.get("/estados/buscarEstado", buscarEstado);
router.get("/roles", getRoles);
router.get("/equiposInstalados", getEquiposInstalados);
router.get("/equipos/:equipoId/preventivo", getPreventivoPlanilla);
router.get("/usuarios", getTecnico);
router.get("/reparacionesConDetalles", reparacionConDetalles);
router.get("/usuariosTecnicos", obtenerTecnicos);
router.get("/equipos/obtenerCapacidadesPorModelo", obtenerCapacidadesPorModelo);
router.get("/fechas", getInformePorFechas);
router.get("/tecnico", getInformePorTecnico);
router.get("/oficina", getInformePorOficina);
router.get("/checklistItems", obtenerChecklistItems);
router.get("/checklistItems/validar", validarChecklistItems);
router.get("/logs", (req, res) => {
  if (req.user?.rolId !== ROLES.ADMIN) {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  try {
    const logs = getLogs();
    res.json(logs);
  } catch (err) {
    console.error("Error en /logs:", err.message);
    res.status(500).json({ error: "Error interno al obtener logs" });
  }
});

// Puts
router.put("/usuarios/:id", updateUsuario);
router.put("/actualizarEstadoEquipo/:id", actualizarEstadoEquipo);
router.put("/equiposInstalados/:id", actualizarEstadoEquipo);
router.put("/createObservacionesReparaciones", createObservacionesReparaciones);
router.put("/reparaciones/asignar", asignarTecnico);
router.put("/equiposInstalados/:id/baja", bajaEquiposInstalados);
router.put("/actualizarPassword", actualizarPassword);
router.put(
  "/equipos_instalados/:id/fotos",
  upload.array("fotos", 2),
  actualizarFotosEquipo,
);

export default router;
