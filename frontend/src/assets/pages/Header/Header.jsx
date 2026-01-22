import { Link } from "react-router-dom";
import logo from "./images/logo_CSJN.png";
import "./css/Header.css";
import { getRedirectPath } from "../../common/helpers/authHelpers";

const Header = () => {
  return (
    <>
      <nav className="navbar expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={getRedirectPath()}>
            <img src={logo} alt="" className="rounded mx-auto d-block" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
