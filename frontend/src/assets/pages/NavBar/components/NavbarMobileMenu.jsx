import { NavLink, useNavigate } from "react-router-dom";

function NavbarMobileMenu({ itemsByGroup, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="collapse navbar-collapse d-lg-none show">
      <ul className="navbar-nav mx-auto mb-2">
        {Object.entries(itemsByGroup).map(([groupName, items]) => (
          <li key={groupName}>
            <span className="nav-link fw-bold text-uppercase text-muted">{groupName}</span>
            <ul className="list-unstyled ms-3">
              {items.map((item) => (
                <li key={item.path}>
                  <NavLink className="nav-link" to={item.path} onClick={onClose}>
                    <i className={`${item.icon} me-2`}></i>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        ))}

        <li className="nav-item mt-3">
          <button
            className="nav-link btn btn-link text-start"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Salir
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavbarMobileMenu;