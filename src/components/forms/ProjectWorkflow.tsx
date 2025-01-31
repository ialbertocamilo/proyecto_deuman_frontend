//import "../public/assets/css/globals.css";
//import "../public/assets/css/button-builder.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const ProjectWorkflow = () => {
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

  const router = useRouter();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="project-workflow-container d-flex justify-content-center align-items-center"
         style={{ height: "100vh", background: "url('/assets/images/background.jpg') no-repeat center center/cover", fontFamily: "Poppins, sans-serif" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "900px" }}>
        {step === 1 && (
          <div>
            <h4 className="fw-bold text-custom-blue">Detalles del Propietario</h4>
            <input type="text" className="form-control mb-2" name="ownerName" placeholder="Nombre del propietario" value={formData.ownerName} onChange={(e) => setFormData({...formData, ownerName: e.target.value})} />
            <input type="text" className="form-control mb-2" name="ownerLastName" placeholder="Apellido del propietario" value={formData.ownerLastName} onChange={(e) => setFormData({...formData, ownerLastName: e.target.value})} />
            <button className="btn btn-primary mt-3" onClick={nextStep}>Siguiente</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="fw-bold text-custom-blue">Ubicación del Proyecto</h4>
            <input type="text" className="form-control mb-2" name="location" placeholder="Dirección o mapa" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
            <button className="btn btn-secondary me-2" onClick={prevStep}>Anterior</button>
            <button className="btn btn-primary" onClick={nextStep}>Siguiente</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="fw-bold text-custom-blue">Definición de Materiales</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Conductividad</th>
                  <th>Calor Específico</th>
                  <th>Densidad</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Hormigón Armado</td><td>1.63</td><td>0.92</td><td>2400</td></tr>
              </tbody>
            </table>
            <button className="btn btn-secondary me-2" onClick={prevStep}>Anterior</button>
            <button className="btn btn-primary" onClick={nextStep}>Siguiente</button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h4 className="fw-bold text-custom-blue">Detalles Constructivos</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Ubicación</th>
                  <th>Nombre Detalle</th>
                  <th>Capas</th>
                  <th>Espesor</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Techo</td><td>Hormigón</td><td>3</td><td>20cm</td></tr>
              </tbody>
            </table>
            <button className="btn btn-secondary me-2" onClick={prevStep}>Anterior</button>
            <button className="btn btn-primary" onClick={nextStep}>Siguiente</button>
          </div>
        )}

        {step === 5 && (
          <div>
            <h4 className="fw-bold text-custom-blue">Elementos Operables</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>U Vidrio</th>
                  <th>FS Vidrio</th>
                  <th>Tipo Cierre</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Ventana 1</td><td>1.2</td><td>0.5</td><td>Corrediza</td></tr>
              </tbody>
            </table>
            <button className="btn btn-secondary me-2" onClick={prevStep}>Anterior</button>
            <button className="btn btn-success" onClick={() => alert('Registro Completado')}>Finalizar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectWorkflow;
