import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // logica de autenticacion
    if (email === "admin@example.com" && password === "password123") {
      // Redirigir al usuario si las credenciales son correctas
      router.push("/admin");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password"); 
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem" }}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          {error && (
            <p style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</p>
          )}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <a
              onClick={handleForgotPassword}
              style={{
                color: "#007bff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Olvidé mi contraseña
            </a>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Iniciar sesión
          </button>
        </form>
        <button
          type="button"
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "4px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Login;
