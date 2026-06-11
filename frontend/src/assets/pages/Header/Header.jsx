import { Link } from "react-router-dom";
import logo from "./images/Logo-teknik.png";
import "./css/Header.css";
import { getRedirectPath } from "../../common/helpers/authHelpers";

const Header = () => {
  return (
    <>
      <nav className="navbar expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex flex-column align-items-center">
          <Link className="navbar-brand mb-0" to={getRedirectPath()}>
            <img src={logo} alt="" className="rounded mx-auto d-block" />
          </Link>
          <p className="d-none d-md-block text-center mb-0" style={{ fontSize: "0.85rem", color: "#555" }}>
            Servicio de mantenimiento Termomecánico y aires acondicionados para la CSJN
          </p>
        </div>
      </nav>
    </>
  );
};
export default Header;