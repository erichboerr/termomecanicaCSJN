
function NavbarLogout({ className = "", label = "Salir", redirect = "/" }) {
  

  return (
    <button
      className={`btn btn-outline-light btn-sm ${className}`}
      onClick={() => {
        sessionStorage.clear();
        window.location.href = redirect;
        //navigate(redirect, { replace: true });
      }}
    >
      <i className="bi bi-box-arrow-right me-1"></i>
      {label}
    </button>
  );
}

export default NavbarLogout;