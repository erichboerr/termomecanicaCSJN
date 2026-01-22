import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../assets/pages/Header/Header";
import Navbar from "../assets/pages/NavBar/Navbar";
import Login from "../assets/pages/Login/Login";
import AltaUsuario from "../assets/pages/AltaUsuario/AltaUsuario";
import BajaUsuario from "../assets/pages/BajaUsuario/BajaUsuario";
import ListadoEquipo from "../assets/pages/ListadosEquipos/ListadoEquipo";
import AltaEquipo from "../assets/pages/AltaEquipo/AltaEquipo";
import InstalarEquipo from "../assets/pages/InstalarEquipo/CargarEquipo";
import ReparacionesEquipos from "../assets/pages/ReparacionesEquipos/ReparacionesEquipos";
import AsignarTecnico from "../assets/pages/AsignarTecnico/AsignarTecnico";
import BajaEquipo from "../assets/pages/BajaEquipo/BajaEquipo";
import ReportesPage from "../assets/pages/Informes/ReportesPage";
import ActualizarPassword from "../assets/pages/ModificacionUsuario/ActualizarPassword";
import ActualizarEquipo from "../assets/pages/ActualizarEquipo/ActualizarEquipo";
import EntradaDesdeQR from "../assets/pages/ListadosEquipos/components/EntradaDesdeQR";
import EquipoDetalle from "../assets/pages/PedidoCliente/EquipoDetalle";
import ProtectedRoute from "../middleware/ProtectedRoute";
import ListadoEquipoPreventivo from "../assets/pages/ListadosEquiposPreventivo/ListadoEquipoPreventivo";
import LogsViewer from "../assets/pages/admin/LogsViewer";
import { RequireAuth } from "../assets/common/components/RequireAuth";

const Rutas = () => {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/AltaUsuario"
          element={
            <RequireAuth>
              <AltaUsuario />
            </RequireAuth>
          }
        />
        <Route
          path="/BajaUsuario"
          element={
            <RequireAuth>
              <BajaUsuario />
            </RequireAuth>
          }
        />
        <Route
          path="/ListadoEquipos"
          element={
            <RequireAuth>
              <ListadoEquipo />
            </RequireAuth>
          }
        />
        <Route
          path="/AltaEquipo"
          element={
            <RequireAuth>
              <AltaEquipo />
            </RequireAuth>
          }
        />
        <Route
          path="/InstalarEquipo"
          element={
            <RequireAuth>
              <InstalarEquipo />
            </RequireAuth>
          }
        />
        <Route
          path="/ReparacionesEquipos"
          element={
            <RequireAuth>
              <ReparacionesEquipos />
            </RequireAuth>
          }
        />
        <Route
          path="/AsignarTecnico"
          element={
            <RequireAuth>
              <AsignarTecnico />
            </RequireAuth>
          }
        />
        <Route
          path="/BajaEquipo"
          element={
            <RequireAuth>
              <BajaEquipo />
            </RequireAuth>
          }
        />
        <Route
          path="/Reportes"
          element={
            <RequireAuth>
              <ReportesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/ActualizarPassword"
          element={
            <RequireAuth>
              <ActualizarPassword />
            </RequireAuth>
          }
        />
        <Route
          path="/ActualizarEquipo"
          element={
            <RequireAuth>
              <ActualizarEquipo />
            </RequireAuth>
          }
        />
        <Route
          path="/detalle-equipo/:id"
          element={
            <RequireAuth>
              <EquipoDetalle />
            </RequireAuth>
          }
        />
        <Route
          path="/entrada-qr"
          element={
            <RequireAuth>
              <EntradaDesdeQR />
            </RequireAuth>
          }
        />
        <Route
          path="/logs"
          element={
            <RequireAuth>
              <LogsViewer />
            </RequireAuth>
          }
        />
        <Route
          path="/equipoDetalle"
          element={
            <ProtectedRoute>
              <EquipoDetalle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listadoEquipoPreventivo"
          element={
            <ProtectedRoute>
              <ListadoEquipoPreventivo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Rutas;
