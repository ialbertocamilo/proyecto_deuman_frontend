import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Navbar from "../src/components/layout/Navbar";
import TopBar from "../src/components/layout/TopBar";
import ProjectList from "../src/components/forms/ProjectList";
import ProjectWorkflow from "../src/components/forms/ProjectWorkflow";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const [activeView, setActiveView] = useState<string>("projects");
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  const renderContent = () => {
    switch (activeView) {
      case "projectWorkflow":
        return <ProjectWorkflow />;
      case "projects":
        return <ProjectList setActiveView={setActiveView} />;
      default:
        return (
          <div className="text-center mt-5">
            <h1 className="fw-bold text-primary">¡Bienvenido!</h1>
            <p>Gestiona tus proyectos de manera eficiente.</p>
            <i className="bi bi-bar-chart-fill text-primary" style={{ fontSize: "50px" }}></i>
          </div>
        );
    }
  };

  return (
    <div className="d-flex">
      <Navbar setActiveView={setActiveView} />
      <div className="d-flex flex-column flex-grow-1" style={{ marginLeft: "0px", width: "100%" }}>
        <TopBar />
        <div className="content p-4" style={{ marginTop: "60px" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
