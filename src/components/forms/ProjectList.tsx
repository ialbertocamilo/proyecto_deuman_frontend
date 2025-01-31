import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProjectListProps {
  setActiveView: (view: string) => void;
}

const ProjectList = ({ setActiveView }: ProjectListProps) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token"); // Obtiene el token almacenado

    if (!token) {
      setError("No estás autenticado. Inicia sesión nuevamente.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://deuman-backend.svgdev.tech/projects", {
        headers: {
          "Authorization": `Bearer ${token}`, // Enviar token en los headers
          "Content-Type": "application/json",
        },
      });

      setProjects(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al obtener los proyectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4 className="fw-bold">Listado de proyectos</h4>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Cargando proyectos...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Estado del proyecto</th>
                <th>Nombre del proyecto</th>
                <th>Nombre del propietario</th>
                <th>Nombre del diseñador</th>
                <th>Director responsable de las obras</th>
                <th>Dirección</th>
                <th>Departamento</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>
                      <span className={`badge bg-${project.status === "Rechazado" ? "danger" : "success"}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>{project.project_name}</td>
                    <td>{project.owner_name}</td>
                    <td>{project.designer_name}</td>
                    <td>{project.director_name}</td>
                    <td>{project.address}</td>
                    <td>{project.department}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-muted">
                    No hay proyectos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <button
        className="btn btn-primary"
        onClick={() => setActiveView("projectWorkflow")} // Cambia la vista a "projectWorkflow"
      >
        + Proyecto Nuevo
      </button>
    </div>
  );
};

export default ProjectList;
