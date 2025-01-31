import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

const TopBar = () => {
  const [user, setUser] = useState({ name: "Usuario", email: "user@example.com" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("user_name") || "Usuario";
      const storedEmail = localStorage.getItem("email") || "user@example.com";

      setUser({ name: storedName, email: storedEmail });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    if (router) {
      router.push("/login");
    }
  };

  if (!isMounted) {
    return null; // Evita renderizar hasta que el componente esté listo
  }

  return (
    <nav className="navbar navbar-light bg-light shadow-sm px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-secondary me-3">
            <i className="bi bi-list"></i>
          </button>
          <input type="text" className="form-control me-2" placeholder="Buscar..." style={{ width: "250px" }} />
        </div>

        <div className="d-flex align-items-center">
          <button className="btn btn-outline-secondary me-2">
            <i className="bi bi-gear"></i>
          </button>
          <button className="btn btn-outline-secondary me-2">
            <i className="bi bi-bell"></i>
          </button>
          <button className="btn btn-outline-secondary me-2">
            <i className="bi bi-envelope"></i>
          </button>

          <div className="dropdown">
            <button className="btn d-flex align-items-center" onClick={() => setMenuOpen(!menuOpen)}>
              <div className="text-end me-2">
                <span className="d-block fw-bold text-primary" style={{ fontSize: "14px" }}>{user.email}</span>
                <span className="text-muted" style={{ fontSize: "12px" }}>{user.name}</span>
              </div>
              <img src="/assets/images/user_icon.png" alt="User" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
            </button>

            {menuOpen && (
              <div className="dropdown-menu dropdown-menu-end show mt-2 shadow-sm" style={{ right: 0 }}>
                <a className="dropdown-item" href="/profile"><i className="bi bi-person me-2"></i> Perfil</a>
                <a className="dropdown-item" href="/settings"><i className="bi bi-gear me-2"></i> Configuración</a>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
