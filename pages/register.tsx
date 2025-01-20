import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    number_phone: "",
    birthdate: "",
    country: "",
    ubigeo: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirm_password } = formData;

    if (password !== confirm_password) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // logica para enviar los datos a la API
    console.log("Datos enviados:", formData);
    setError(null);
    setSuccessMessage("Registro exitoso. Ahora puedes iniciar sesión.");
    setFormData({
      name: "",
      lastname: "",
      email: "",
      number_phone: "",
      birthdate: "",
      country: "",
      ubigeo: "",
      password: "",
      confirm_password: "",
    });
  };

  return (
    <div
      className="register-container"
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
          maxWidth: "500px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Registro</h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Nombre", name: "name", type: "text" },
            { label: "Apellido", name: "lastname", type: "text" },
            { label: "Correo Electrónico", name: "email", type: "email" },
            { label: "Teléfono", name: "number_phone", type: "tel" },
            { label: "Fecha de Nacimiento", name: "birthdate", type: "date" },
            { label: "País", name: "country", type: "text" },
            { label: "Ubigeo", name: "ubigeo", type: "text" },
            { label: "Contraseña", name: "password", type: "password" },
            { label: "Confirmar Contraseña", name: "confirm_password", type: "password" },
          ].map(({ label, name, type }) => (
            <div style={{ marginBottom: "1rem" }} key={name}>
              <label htmlFor={name} style={{ display: "block", marginBottom: "0.5rem" }}>
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          ))}
          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
          {successMessage && (
            <p style={{ color: "green", marginBottom: "1rem" }}>{successMessage}</p>
          )}
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
              marginBottom: "1rem",
            }}
          >
            Registrarse
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "4px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Atrás
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
