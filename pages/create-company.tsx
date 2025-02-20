import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useRouter } from "next/router";
import "../public/assets/css/globals.css";
import CustomButton from "../src/components/common/CustomButton";
import { constantUrlApiEndpoint } from "../src/utils/constant-url-endpoint";

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    country_base: "",
    legal_name: "",
    address: "",
    sector: "",
    business_model: "",
    manager: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (
      !formData.name ||
      !formData.country_base ||
      !formData.legal_name ||
      !formData.address ||
      !formData.sector ||
      !formData.business_model ||
      !formData.manager
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    const requestBody = {
      name: formData.name,
      country_base: formData.country_base,
      legal_name: formData.legal_name,
      address: formData.address,
      sector: formData.sector,
      business_model: formData.business_model,
      manager: formData.manager,
    };

    console.log("Enviando datos al backend:", requestBody);

    try {
      const response = await fetch(`${constantUrlApiEndpoint}/company-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log("Respuesta del backend:", data);
      if (!response.ok) {
        throw new Error(data.message || "Error al crear la empresa.");
      }
      setSuccessMessage("Empresa creada exitosamente.");
      setTimeout(() => {
        router.push("/login"); // Redirigir al login o página principal después de crear la empresa
      }, 500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error al crear empresa:", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    border: "2px solid var(--muted-text)",
    borderRadius: "0.5rem",
    margin: 0,
    padding: "0.5rem",
    fontFamily: "var(--font-family-base)",
  };

  const leftSpacingStyle = { marginBottom: "0.1rem" };
  const labelStyle = {
    marginBottom: "0.1rem",
    fontFamily: "var(--font-family-base)",
  };

  return (
    <div
      className="create-company-container d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "url('/assets/images/background.jpg') no-repeat center center/cover",
        fontFamily: "var(--font-family-base)",
      }}
    >
      <div
        className="card p-5 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "20px",
          backgroundColor: "#fff",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h4
          className="text-start fw-bold mb-3"
          style={{
            color: "var(--primary-color)", // Color primario aplicado aquí
            fontFamily: "var(--font-family-base)",
          }}
        >
          Crear Empresa
        </h4>
        {error && (
          <div
            className="alert alert-danger"
            style={{ marginBottom: "1rem", fontFamily: "var(--font-family-base)" }}
          >
            {error}
          </div>
        )}
        {successMessage && (
          <div
            className="alert alert-success"
            style={{ marginBottom: "1rem", fontFamily: "var(--font-family-base)" }}
          >
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row align-items-stretch">
            <div className="col-md-6 pe-3">
              <div style={{ border: "2px solid var(--muted-text)", borderRadius: "0.5rem", padding: "1rem" }}>
                <div style={leftSpacingStyle}>
                  <label className="form-label fw-bold" style={{ color: "#000", ...labelStyle }}>
                    Nombre de la Empresa
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={leftSpacingStyle}>
                  <label className="form-label fw-bold" style={{ color: "#000", ...labelStyle }}>
                    Nombre Legal de la Empresa
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="legal_name"
                    value={formData.legal_name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={leftSpacingStyle}>
                  <label className="form-label fw-bold" style={{ color: "#000", ...labelStyle }}>
                    País de Origen
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="country_base"
                    value={formData.country_base}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={leftSpacingStyle}>
                  <label className="form-label fw-bold" style={{ color: "#000", ...labelStyle }}>
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 pe-3">
              <div style={{ border: "2px solid var(--muted-text)", borderRadius: "0.5rem", padding: "1rem" }}>
                <div style={leftSpacingStyle}>
                  <label className="form-label fw-bold" style={{ color: "#000", ...labelStyle }}>
                    Sector
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={leftSpacingStyle}>
                  <label className="form-label fw-bold" style={{ color: "#000", ...labelStyle }}>
                    Modelo de Negocio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="business_model"
                    value={formData.business_model}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={leftSpacingStyle}>
                  <label className="form-label fw-bold" style={{ color: "#000", ...labelStyle }}>
                    Nombre del Gerente
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between" style={{ marginTop: "0.5rem" }}>
            <CustomButton
              type="button"
              variant="backIcon"
              onClick={() => router.push("/login")}
              style={{
                borderRadius: "0.5rem",
                fontFamily: "var(--font-family-base)",
              }}
            >
              Regresar
            </CustomButton>
            <CustomButton
              type="submit"
              variant="save"
              disabled={loading}
              style={{
                borderRadius: "0.5rem",
                minWidth: "auto",
                fontFamily: "var(--font-family-base)",
              }}
            >
              {loading ? (
                "Creando..."
              ) : (
                <>
                  <i className="bi bi-save me-2"></i>
                  Crear Empresa
                </>
              )}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
