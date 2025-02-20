import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal, { SweetAlertResult } from "sweetalert2";
import Navbar from "../src/components/layout/Navbar";
import TopBar from "../src/components/layout/TopBar";
import CustomButton from "../src/components/common/CustomButton";
import { constantUrlApiEndpoint } from "../src/utils/constant-url-endpoint";
import "../public/assets/css/globals.css";

const modalWidth = "90%";
const modalHeight = "auto";
const countryOptions = ["Perú", "Chile", "Argentina", "Brasil"];
const departmentOptions = ["Lima", "Arequipa", "Cusco"];
const provinceOptions = ["Provincia 1", "Provincia 2", "Provincia 3"];
const districtOptions = ["Distrito 1", "Distrito 2", "Distrito 3"];

interface Divisions {
  department?: string;
  province?: string;
  district?: string;
}

export interface Project {
  id: number;
  status?: string;
  name_project?: string;
  owner_name?: string;
  designer_name?: string;
  director_name?: string;
  address?: string;
  country?: string;
  divisions?: Divisions;
  owner_lastname?: string;
  building_type?: string;
  main_use_type?: string;
  number_levels?: number;
  number_homes_per_level?: number;
  built_surface?: number;
  latitude?: number;
  longitude?: number;
}

interface FetchProjectsResponse {
  projects: Project[];
  total_pages: number;
  current_page: number;
}

interface ErrorResponse {
  detail?: string;
}

// Definimos un objeto inicial para el proyecto a editar (cumpliendo con la interfaz)
const initialProject: Project = {
  id: 0,
  status: "",
  name_project: "",
  owner_name: "",
  designer_name: "",
  director_name: "",
  address: "",
  country: "",
  divisions: { department: "", province: "", district: "" },
  owner_lastname: "",
  building_type: "",
  main_use_type: "",
  number_levels: 0,
  number_homes_per_level: 0,
  built_surface: 0,
  latitude: 0,
  longitude: 0,
};

const ProjectListPage = () => {
  const router = useRouter();
  const [sidebarWidth, setSidebarWidth] = useState<string>("300px");

  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit: number = 5;
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editProjectData, setEditProjectData] = useState<Project>(initialProject);

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  const fetchProjects = async (page: number): Promise<void> => {
    setLoading(true);
    const token: string | null = localStorage.getItem("token");
    if (!token) {
      console.error("No se encontró un token en localStorage.");
      setError("No estás autenticado. Inicia sesión nuevamente.");
      setLoading(false);
      return;
    }
    try {
      console.log("📡 Obteniendo proyectos, página:", page);
      const response = await axios.get<FetchProjectsResponse>(
        `${constantUrlApiEndpoint}/projects`,
        {
          params: { limit, num_pag: page },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Proyectos recibidos:", response.data);
      setProjects(response.data.projects);
      setFilteredProjects(response.data.projects);
      setTotalPages(response.data.total_pages);
      setCurrentPage(response.data.current_page);
    } catch (err: unknown) {
      console.error("Error al obtener los proyectos:", err);
      if (axios.isAxiosError(err) && err.response) {
        const errorResponse = err.response.data as ErrorResponse;
        setError(errorResponse.detail || "Error al obtener los proyectos.");
      } else {
        setError("Error de conexión con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query: string = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = projects.filter((project: Project) => {
      // Obtenemos los valores con un tipado explícito
      const values: Array<string | number | boolean | null | undefined> = Object.values(project);
      const combined: string = values
        .map((val: string | number | boolean | null | undefined): string => {
          if (val === undefined || val === null) return "";
          if (typeof val === "object") return JSON.stringify(val);
          return String(val);
        })
        .join(" ")
        .toLowerCase();
      return combined.includes(query);
    });
    setFilteredProjects(filtered);
  };

  const handlePageChange = (newPage: number): void => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleOpenEditModal = (project: Project): void => {
    const dataToEdit: Project = {
      id: project.id,
      country: project.country || "",
      divisions: {
        district: project.divisions?.district || "",
        province: project.divisions?.province || "",
        department: project.divisions?.department || "",
      },
      name_project: project.name_project || "",
      owner_name: project.owner_name || "",
      owner_lastname: project.owner_lastname || "",
      building_type: project.building_type || "",
      main_use_type: project.main_use_type || "",
      number_levels: project.number_levels || 0,
      number_homes_per_level: project.number_homes_per_level || 0,
      built_surface: project.built_surface || 0,
      latitude: project.latitude || 0,
      longitude: project.longitude || 0,
      designer_name: project.designer_name,
      director_name: project.director_name,
      address: project.address,
      status: project.status,
    };
    setEditProjectData(dataToEdit);
    setShowEditModal(true);
    setError(null);
  };

  const handleEditChange = (
    field: keyof Project,
    value: Project[keyof Project]
  ): void => {
    setEditProjectData({ ...editProjectData, [field]: value });
  };

  const handleEditDivisionChange = (
    subfield: keyof Divisions,
    value: string
  ): void => {
    setEditProjectData({
      ...editProjectData,
      divisions: { ...editProjectData.divisions, [subfield]: value },
    });
  };

  const handleEditSubmit = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) {
      setError("No estás autenticado. Inicia sesión nuevamente.");
      return;
    }
    if (!editProjectData.id) {
      setError("El ID del proyecto no está definido.");
      return;
    }
    try {
      const url = `${constantUrlApiEndpoint}/my-projects/${editProjectData.id}/update`;
      const updatedData = {
        country: editProjectData.country,
        divisions: editProjectData.divisions,
        name_project: editProjectData.name_project,
        owner_name: editProjectData.owner_name,
        owner_lastname: editProjectData.owner_lastname,
        building_type: editProjectData.building_type,
        main_use_type: editProjectData.main_use_type,
        number_levels: Number(editProjectData.number_levels),
        number_homes_per_level: Number(editProjectData.number_homes_per_level),
        built_surface: Number(editProjectData.built_surface),
        latitude: Number(editProjectData.latitude),
        longitude: Number(editProjectData.longitude),
      };

      await axios.put<void>(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        title: "¡Proyecto editado correctamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then((): void => {
        setShowEditModal(false);
        fetchProjects(currentPage);
      });
    } catch (err: unknown) {
      console.error("Error al editar el proyecto:", err);
      setError("Ocurrió un error al editar el proyecto.");
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al editar el proyecto.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleDelete = async (
    projectId: number,
    projectName: string
  ): Promise<void> => {
    const result: SweetAlertResult = await Swal.fire({
      title: "¿Estás seguro de eliminar este proyecto?",
      text: `ID: ${projectId} - Nombre: ${projectName}\nEsta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) return;

    const token: string | null = localStorage.getItem("token");
    if (!token) {
      setError("No estás autenticado. Inicia sesión nuevamente.");
      return;
    }
    try {
      const url = `${constantUrlApiEndpoint}/project/${projectId}/delete`;
      await axios.delete<void>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      Swal.fire({
        title: "¡Proyecto eliminado exitosamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      fetchProjects(currentPage);
    } catch (err: unknown) {
      console.error("Error al eliminar proyecto:", err);
      setError("No se pudo eliminar el proyecto.");
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el proyecto.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleCloseModal = (): void => {
    setShowEditModal(false);
  };

  const getStatusStyle = (status: string | undefined): React.CSSProperties => {
    const s = status?.toLowerCase();
    if (s === "finalizado") {
      return { backgroundColor: "#ffe8e8", color: "#e45f5f" };
    }
    if (s === "registrado") {
      return { backgroundColor: "#e8ffed", color: "#a9dfb4" };
    }
    if (s === "en proceso") {
      return { backgroundColor: "#fff9e8", color: "#edc68c" };
    }
    return {};
  };

  return (
    <div className="d-flex" style={{ fontFamily: "var(--font-family-base)" }}>
      <Navbar setActiveView={() => {}} setSidebarWidth={setSidebarWidth} />
      <div
        className="d-flex flex-column flex-grow-1"
        style={{ marginLeft: sidebarWidth, width: "100%" }}
      >
        <TopBar sidebarWidth={sidebarWidth} />
        <div className="container p-4" style={{ marginTop: "60px" }}>
          <h4 className="fw-bold" style={{ fontFamily: "var(--font-family-base)" }}>
            Listado de proyectos
          </h4>
          {error && (
            <p className="text-danger fw-bold" style={{ fontFamily: "var(--font-family-base)" }}>
              {error}
            </p>
          )}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">Cargando...</div>
            </div>
          ) : (
            <>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍︎"
                  value={search}
                  onChange={handleSearch}
                  style={{
                    fontFamily: "var(--font-family-base)",
                    fontSize: "var(--font-size-base)",
                  }}
                />
                <CustomButton
                  variant="save"
                  onClick={() => router.push("/project-workflow")}
                  style={{
                    fontFamily: "var(--font-family-base)",
                    fontSize: "var(--font-size-base)",
                    marginLeft: "1rem",
                  }}
                >
                  + Proyecto Nuevo
                </CustomButton>
              </div>

              <div className="table-responsive">
                <table className="custom-table" style={{ fontFamily: "var(--font-family-base)" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Estado del Proyecto</th>
                      <th>Nombre del proyecto</th>
                      <th>Propietario</th>
                      <th>Diseñador</th>
                      <th>Director responsable</th>
                      <th>Dirección</th>
                      <th>Departamento</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project: Project) => (
                        <tr key={project.id}>
                          <td>{project.id || "N/D"}</td>
                          <td>
                            <span
                              className="badge status-badge"
                              style={{
                                ...getStatusStyle(project.status),
                                fontSize: "0.8rem",
                              }}
                            >
                              {project.status ? project.status.toUpperCase() : "NO DISPONIBLE"}
                            </span>
                          </td>
                          <td>{project.name_project || "No disponible"}</td>
                          <td>{project.owner_name || "No disponible"}</td>
                          <td>{project.designer_name || "N/D"}</td>
                          <td>{project.director_name || "N/D"}</td>
                          <td>{project.address || "N/D"}</td>
                          <td>{project.divisions?.department || "No disponible"}</td>
                          <td className="text-center">
                            <div className="action-btn-group">
                              <CustomButton
                                variant="editIcon"
                                onClick={() => handleOpenEditModal(project)}
                                style={{
                                  backgroundColor: "var(--primary-color)",
                                  border: `2px solid var(--primary-color)`,
                                  fontFamily: "var(--font-family-base)",
                                  padding: "0.5rem",
                                  width: "40px",
                                  height: "40px",
                                }}
                              />
                              <CustomButton
                                variant="deleteIcon"
                                onClick={() =>
                                  handleDelete(project.id, project.name_project || "N/D")
                                }
                                style={{
                                  fontFamily: "var(--font-family-base)",
                                  padding: "0.5rem",
                                  width: "40px",
                                  height: "40px",
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-center text-muted">
                          No hay proyectos disponibles o no coinciden con la búsqueda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div
                className="d-flex justify-content-center align-items-center mt-3"
                style={{ fontFamily: "var(--font-family-base)" }}
              >
                <CustomButton
                  variant="backIcon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                <span
                  style={{
                    fontFamily: "var(--font-family-base)",
                    fontSize: "var(--font-size-base)",
                    margin: "0 1.5rem",
                  }}
                >
                  Página {currentPage} de {totalPages}
                </span>
                <CustomButton
                  variant="forwardIcon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </div>
            </>
          )}

          {showEditModal && (
            <>
              <div className="modal-backdrop fade show"></div>
              <div
                className="modal fade show"
                style={{
                  display: "block",
                  marginTop: "40px",
                  marginLeft: "20px",
                  width: modalWidth,
                  height: modalHeight,
                  fontFamily: "var(--font-family-base)",
                }}
                tabIndex={-1}
                role="dialog"
              >
                <div className="modal-dialog modal-lg" role="document" style={{ width: "100%" }}>
                  <div
                    className="modal-content"
                    style={{ height: "100%", fontFamily: "var(--font-family-base)" }}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title">Editar Proyecto #{editProjectData.id}</h5>
                      <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">
                      <div className="row g-3" style={{ fontFamily: "var(--font-family-base)" }}>
                        <div className="col-md-4">
                          <label className="form-label">País</label>
                          <select
                            className="form-select"
                            value={editProjectData.country}
                            onChange={(e) => handleEditChange("country", e.target.value)}
                            style={{ fontFamily: "var(--font-family-base)" }}
                          >
                            <option value="">Seleccione un país</option>
                            {countryOptions.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Departamento</label>
                          <select
                            className="form-select"
                            value={editProjectData.divisions?.department}
                            onChange={(e) =>
                              handleEditDivisionChange("department", e.target.value)
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          >
                            <option value="">Seleccione un departamento</option>
                            {departmentOptions.map((dep) => (
                              <option key={dep} value={dep}>
                                {dep}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Provincia</label>
                          <select
                            className="form-select"
                            value={editProjectData.divisions?.province}
                            onChange={(e) =>
                              handleEditDivisionChange("province", e.target.value)
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          >
                            <option value="">Seleccione una provincia</option>
                            {provinceOptions.map((prov) => (
                              <option key={prov} value={prov}>
                                {prov}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Distrito</label>
                          <select
                            className="form-select"
                            value={editProjectData.divisions?.district}
                            onChange={(e) =>
                              handleEditDivisionChange("district", e.target.value)
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          >
                            <option value="">Seleccione un distrito</option>
                            {districtOptions.map((dist) => (
                              <option key={dist} value={dist}>
                                {dist}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Nombre del Proyecto</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editProjectData.name_project}
                            onChange={(e) =>
                              handleEditChange("name_project", e.target.value)
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Propietario</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editProjectData.owner_name}
                            onChange={(e) =>
                              handleEditChange("owner_name", e.target.value)
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Apellido Propietario</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editProjectData.owner_lastname}
                            onChange={(e) =>
                              handleEditChange("owner_lastname", e.target.value)
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Tipo de Edificación</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editProjectData.building_type}
                            onChange={(e) =>
                              handleEditChange("building_type", e.target.value)
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Uso Principal</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editProjectData.main_use_type}
                            onChange={(e) =>
                              handleEditChange("main_use_type", e.target.value)
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Niveles</label>
                          <input
                            type="number"
                            className="form-control"
                            value={editProjectData.number_levels}
                            onChange={(e) =>
                              handleEditChange("number_levels", Number(e.target.value))
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Viviendas x Nivel</label>
                          <input
                            type="number"
                            className="form-control"
                            value={editProjectData.number_homes_per_level}
                            onChange={(e) =>
                              handleEditChange("number_homes_per_level", Number(e.target.value))
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Superficie (m2)</label>
                          <input
                            type="number"
                            className="form-control"
                            value={editProjectData.built_surface}
                            onChange={(e) =>
                              handleEditChange("built_surface", Number(e.target.value))
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Latitude</label>
                          <input
                            type="number"
                            className="form-control"
                            value={editProjectData.latitude}
                            onChange={(e) =>
                              handleEditChange("latitude", Number(e.target.value))
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Longitude</label>
                          <input
                            type="number"
                            className="form-control"
                            value={editProjectData.longitude}
                            onChange={(e) =>
                              handleEditChange("longitude", Number(e.target.value))
                            }
                            style={{ fontFamily: "var(--font-family-base)" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer" style={{ fontFamily: "var(--font-family-base)" }}>
                      <CustomButton variant="back" onClick={handleCloseModal}>
                        Cancelar
                      </CustomButton>
                      <CustomButton variant="save" onClick={handleEditSubmit}>
                        Guardar Cambios
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <style jsx>{`
            .custom-project-btn {
              background-color: #3ca7b7;
              border: 1px solid #3ca7b7;
              color: #fff;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              transition: background-color 0.3s ease;
            }
            .custom-project-btn:hover {
              background-color: #329ca1;
            }
            .custom-table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0 12px;
            }
            .custom-table th,
            .custom-table td {
              padding: 8px;
              text-align: center;
              vertical-align: middle;
              border: none;
            }
            .custom-table th {
              color: #a0a0a0;
              font-weight: bold;
              background-color: #fff;
            }
            .custom-table tbody tr {
              background-color: #fff;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              border-radius: 16px;
              overflow: hidden;
            }
            .custom-table tbody tr td:first-child {
              border-top-left-radius: 16px;
              border-bottom-left-radius: 16px;
            }
            .custom-table tbody tr td:last-child {
              border-top-right-radius: 16px;
              border-bottom-right-radius: 16px;
            }
            .action-btn-group {
              display: flex;
              gap: 0.5rem;
            }
            .status-badge {
              display: inline-block;
              font-size: 1.1rem;
              font-weight: bold;
              padding: 8px 16px;
              border-radius: 0.5rem;
              font-family: var(--font-family-base);
            }
            .loading-container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 80vh;
              font-family: var(--font-family-base);
            }
            .loading-spinner {
              border: 8px solid #f3f3f3;
              border-top: 8px solid var(--primary-color);
              border-radius: 50%;
              width: 60px;
              height: 60px;
              animation: spin 1s linear infinite;
              margin-bottom: 15px;
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            .loading-text {
              font-size: 1.5rem;
              color: var(--primary-color);
              font-weight: bold;
              font-family: var(--font-family-base);
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default ProjectListPage;
