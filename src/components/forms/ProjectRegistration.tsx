import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProjectRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerLastName: '',
    department: '',
    province: '',
    district: '',
    buildingType: '',
    mainUse: '',
    levels: '',
    unitsPerLevel: '',
    area: '',
    location: '',
    materials: [],
    constructionDetails: [],
    operableElements: [],
  });

interface FormData {
    ownerName: string;
    ownerLastName: string;
    department: string;
    province: string;
    district: string;
    buildingType: string;
    mainUse: string;
    levels: string;
    unitsPerLevel: string;
    area: string;
    location: string;
    materials: string[];
    constructionDetails: string[];
    operableElements: string[];
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-primary">Proyecto Nuevo</h2>
      <div className="card p-4 shadow-lg">
        {step === 1 && (
          <div>
            <h4>Agregar detalles propietario / proyecto</h4>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Nombres del propietario</label>
                <input type="text" className="form-control" name="ownerName" value={formData.ownerName} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="form-label">Apellidos del propietario</label>
                <input type="text" className="form-control" name="ownerLastName" value={formData.ownerLastName} onChange={handleChange} />
              </div>
            </div>
            <button className="btn btn-primary" onClick={nextStep}>Siguiente</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4>Ubicación del Proyecto</h4>
            <input type="text" className="form-control mb-3" name="location" placeholder="Ingresa la dirección o selecciona en el mapa" value={formData.location} onChange={handleChange} />
            <button className="btn btn-secondary me-2" onClick={prevStep}>Anterior</button>
            <button className="btn btn-primary" onClick={nextStep}>Siguiente</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRegistration;
