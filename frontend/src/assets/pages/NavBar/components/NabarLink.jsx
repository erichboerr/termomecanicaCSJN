import { NavLink } from "react-router-dom";

function NavbarLinks({ itemsByGroup }) {
  return (
    <ul className="navbar-nav flex-row gap-3">
      {Object.entries(itemsByGroup).map(([groupName, items]) => (
        <li className="nav-item dropdown" key={groupName}>
          <button
            className="btn btn-link nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {groupName}
          </button>
          <ul className="dropdown-menu">
            {items.map((item) => (
              <li key={item.path}>
                <NavLink className="dropdown-item" to={item.path}>
                  <i className={`${item.icon} me-2`}></i>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default NavbarLinks;
