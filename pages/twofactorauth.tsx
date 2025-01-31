import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const TwoFactorAuth = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  
  // Recuperamos el email desde localStorage al cargar el componente
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      setError("No se encontró el email. Inicia sesión nuevamente.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email) return;

    const requestBody = { email, otp };

    console.log("📤 Enviando código al backend:", requestBody);

    try {
      const response = await fetch("http://deuman-backend.svgdev.tech/2fa-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("✅ Respuesta del backend:", data);

      if (!response.ok) {
        throw new Error(data.message || "Código incorrecto.");
      }

      console.log("🔓 Autenticación completada. Redirigiendo...");
      localStorage.setItem("isAuthenticated", "true");

      setTimeout(() => {
        router.push("/dashboard");
      }, 200);
    } catch (err: any) {
      console.error("❌ Error en la verificación:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="twofactor-container">
      <div className="card-auth">
        <h5 className="text-primary fw-bold text-center">Autenticación de Dos Pasos</h5>
        <p className="text-muted text-center">Ingresa el código de 6 dígitos enviado a tu email.</p>
        {error && <p className="text-danger text-center fw-bold">{error}</p>}

        <form onSubmit={handleSubmit} className="form-auth">
          <input 
            type="text" 
            className="otp-input" 
            placeholder="******"
            maxLength={6} 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)}
            required 
            pattern="[0-9]{6}" 
            inputMode="numeric"
          />
          <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
            {loading ? "🔄 Verificando..." : "Confirmar Código"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .twofactor-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url('/assets/images/background.jpg') no-repeat center center/cover;
        }

        .card-auth {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .otp-input {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          letter-spacing: 8px;
          width: 100%;
          padding: 15px;
          border: 2px solid #007bff;
          border-radius: 10px;
          margin-bottom: 1.5rem;
        }

        .form-auth {
          display: flex;
          flex-direction: column;
        }

        .btn-primary {
          font-size: 1.1rem;
          padding: 10px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .btn-primary:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default TwoFactorAuth;
