import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NAVBAR_ITEMS } from "./config/navbarConfig";
import { mapRolIdToKey } from "./helpers/mapRolId";
import NavbarUserInfo from "./components/NavbarUserInfo";
import NavbarLinks from "./components/NabarLink";
import NavbarLogout from "./components/NavbarLogout";
import NavbarMobileMenu from "./components/NavbarMobileMenu";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const location = useLocation();
  const hideOnRoutes = ["/"];  

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (hideOnRoutes.includes(location.pathname)) return null;
  
  const username = sessionStorage.getItem("usuario");
  const rolId = Number(sessionStorage.getItem("rolId"));
  const rolKey = mapRolIdToKey(rolId);
  const itemsByGroup = NAVBAR_ITEMS[rolKey] || {};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        {/* IZQUIERDA */}
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler d-lg-none me-2"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-none d-lg-flex">
            <NavbarUserInfo username={username} />
          </div>
        </div>

        {/* CENTRO */}
        <div className="d-none d-lg-flex flex-grow-1 justify-content-center">
         <NavbarLinks itemsByGroup={itemsByGroup} />
        </div>

        {/* DERECHA */}
        <NavbarLogout className="d-none d-lg-inline" />

        {/* Usuario en mobile */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <NavbarUserInfo username={username} />
        </div>
      </div>

      {/* MENÚ colapsable en mobile */}
      {isMobile && isOpen && <NavbarMobileMenu itemsByGroup={itemsByGroup} onClose={() => setIsOpen(false)} />}
    </nav>
  );
}

export default Navbar;