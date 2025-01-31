import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const VerifyCode = () => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const email = typeof window !== "undefined" ? localStorage.getItem("reset_email") : null;

  useEffect(() => {
    if (!email) {
      router.push("/forgot-password");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email) return;

    try {
      const response = await fetch("http://deuman-backend.svgdev.tech/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Código incorrecto.");
      }

      router.push("/reset-password");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-code-container d-flex justify-content-center align-items-center" 
         style={{ height: "100vh", background: "url('/assets/images/background.jpg') no-repeat center center/cover" }}>
      <div className="card p-5 shadow-lg text-center"
           style={{ width: "100%", maxWidth: "420px", borderRadius: "15px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <h4 className="text-primary fw-bold">Verificar Código</h4>
        <p className="text-muted mb-4">Ingresa el código de 6 dígitos enviado a tu correo.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center"
              placeholder="******"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Verificando..." : "Confirmar Código"}
          </button>
        </form>
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyCode;
