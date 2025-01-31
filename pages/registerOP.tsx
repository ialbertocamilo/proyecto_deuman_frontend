import 'bootstrap/dist/css/bootstrap.min.css';
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
    department: "",
    province: "",
    district: "",
    address: "",
    profession: "",
    password: "",
    confirm_password: "",
    acceptTerms: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "url('/assets/images/background.jpg') no-repeat center center/cover" }}>
      <div className="card p-5 shadow-lg" style={{ width: "100%", maxWidth: "900px", borderRadius: "20px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <h4 className="text-start text-primary fw-bold mb-4">Crear perfil nuevo</h4>
        <div className="row">
          {/* Sección de Perfil */}
          <div className="col-md-5 border-end pe-4">
            <div className="text-center mb-3">
              <img src="/assets/images/profile-placeholder.png" alt="Perfil" className="rounded-circle mb-2" style={{ width: "90px" }} />
              <h5 className="fw-bold">MARK JECNO</h5>
              <p className="text-muted">Ingeniero Civil</p>
            </div>
            <label className="form-label fw-bold">Dirección de Email</label>
            <input type="email" className="form-control mb-2" name="email" placeholder="Example@gmail.com" value={formData.email} onChange={handleChange} required />
            <label className="form-label fw-bold">Crear contraseña</label>
            <div className="input-group mb-2">
              <input type={showPassword ? "text" : "password"} className="form-control" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Ocultar" : "Mostrar"}</button>
            </div>
            <label className="form-label fw-bold">Confirmar contraseña</label>
            <div className="input-group mb-3">
              <input type={showConfirmPassword ? "text" : "password"} className="form-control" name="confirm_password" placeholder="••••••••" value={formData.confirm_password} onChange={handleChange} required />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "Ocultar" : "Mostrar"}</button>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2">Guardar</button>
          </div>
          
          {/* Sección de Datos Personales */}
          <div className="col-md-7">
            <div className="row mb-3">
              <div className="col">
                <label className="form-label fw-bold">Nombres</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="col">
                <label className="form-label fw-bold">Apellidos</label>
                <input type="text" className="form-control" name="lastname" value={formData.lastname} onChange={handleChange} required />
              </div>
            </div>
            <label className="form-label fw-bold">Profesión u oficio</label>
            <input type="text" className="form-control mb-3" name="profession" value={formData.profession} onChange={handleChange} required />
            <label className="form-label fw-bold">País</label>
            <input type="text" className="form-control mb-3" name="country" value={formData.country} onChange={handleChange} required />
            <div className="row mb-3">
              <div className="col">
                <label className="form-label fw-bold">Departamento</label>
                <input type="text" className="form-control" name="department" value={formData.department} onChange={handleChange} required />
              </div>
              <div className="col">
                <label className="form-label fw-bold">Provincia</label>
                <input type="text" className="form-control" name="province" value={formData.province} onChange={handleChange} required />
              </div>
              <div className="col">
                <label className="form-label fw-bold">Distrito</label>
                <input type="text" className="form-control" name="district" value={formData.district} onChange={handleChange} required />
              </div>
            </div>
            <label className="form-label fw-bold">Dirección</label>
            <input type="text" className="form-control mb-3" name="address" value={formData.address} onChange={handleChange} required />
            <label className="form-label fw-bold">Teléfono</label>
            <input type="text" className="form-control mb-3" name="number_phone" value={formData.number_phone} onChange={handleChange} required />
            <button type="submit" className="btn btn-primary w-100 py-2">Crear y guardar datos</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
