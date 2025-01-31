import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import Navbar from './layout/Navbar';
import TopBar from './layout/TopBar';
import ProjectList from './forms/ProjectList';
import ProjectWorkflow from './forms/ProjectWorkflow';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('projects'); // Estado para manejar las vistas

  const renderContent = () => {
    switch (activeView) {
      case 'projectWorkflow':
        return <ProjectWorkflow />; // Renderiza el flujo paso a paso de registro de proyectos
      case 'projects':
        return <ProjectList setActiveView={setActiveView} />; // Renderiza la lista de proyectos
      default:
        return (
          <div className="text-center mt-5">
            <h1 className="fw-bold text-primary">¡Bienvenido!</h1>
            <p>Gestiona tus proyectos de manera eficiente.</p>
            <i className="bi bi-bar-chart-fill text-primary" style={{ fontSize: '50px' }}></i>
          </div>
        );
    }
  };

  return (
    <div className="d-flex">
      <Navbar setActiveView={setActiveView} /> {/* Pasar función para cambiar la vista */}
      <div className="d-flex flex-column flex-grow-1" style={{ marginLeft: '0px', width: '100%' }}>
        <TopBar />
        <div className="content p-4" style={{ marginTop: '60px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
