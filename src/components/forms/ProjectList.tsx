import React from 'react';

interface ProjectListProps {
  setActiveView: (view: string) => void;
}

const ProjectList = ({ setActiveView }: ProjectListProps) => {
  return (
    <div>
      <h4 className="fw-bold">Listado de proyectos</h4>
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
            <tr>
              <td>1001</td>
              <td>
                <span className="badge bg-danger">Rechazado</span>
              </td>
              <td>Proyecto 1</td>
              <td>Propietario 1</td>
              <td>Diseñador</td>
              <td>Director 1</td>
              <td>Fiering 540</td>
              <td>Sansonate</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => setActiveView('projectWorkflow')} // Cambia la vista a "projectWorkflow"
      >
        + Proyecto Nuevo
      </button>
    </div>
  );
};

export default ProjectList;
