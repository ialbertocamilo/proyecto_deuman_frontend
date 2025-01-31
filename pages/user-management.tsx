import { useState, useEffect } from "react";
import Navbar from "../src/components/layout/Navbar";
import TopBar from "../src/components/layout/TopBar";
import UserTable from "../src/components/forms/UserTable";
import Button from "../src/components/common/Button";
import { useRouter } from "next/router";
import UserEditModal from "../src/components/forms/UserEditModal";

type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  country: string;
  ubigeo: string;
};

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();

  // Cargar usuarios al iniciar la página
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    console.log("📢 Fetching users from backend...");
  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No se encontró un token en el localStorage.");
      return;
    }
  
    try {
      const response = await fetch("http://deuman-backend.svgdev.tech/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // 🔥 Agregar el token aquí
        },
      });
  
      console.log("🔄 Response status:", response.status);
  
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
  
      const data = await response.json();
      console.log("✅ Usuarios recibidos:", data);
  
      setUsers(data);
    } catch (error: any) {
      console.error("❌ Error en fetchUsers:", error.message);
    }
  };
  

  const handleDeleteUser = async (id: number) => {
    console.log(`🗑 Eliminando usuario con ID: ${id}`);

    try {
      const response = await fetch(`http://deuman-backend.svgdev.tech/user/${id}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      console.log("🔄 Response status:", response.status);

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      console.log(`✅ Usuario con ID: ${id} eliminado correctamente`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error: any) {
      console.error("❌ Error en handleDeleteUser:", error.message);
    }
  };

  const handleEditUser = (user: User) => {
    console.log("✏️ Editando usuario:", user);
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleSaveUser = async (updatedUser: User) => {
    console.log("💾 Guardando cambios para usuario:", updatedUser);

    try {
      const response = await fetch(`http://deuman-backend.svgdev.tech/user/${updatedUser.id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      console.log("🔄 Response status:", response.status);

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      console.log("✅ Usuario actualizado correctamente:", updatedUser);
      const updatedUsers = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
      setUsers(updatedUsers);
      setShowEditModal(false);
    } catch (error: any) {
      console.error("❌ Error en handleSaveUser:", error.message);
    }
  };

  return (
    <div className="d-flex">
      <Navbar setActiveView={() => {}} />
      <div className="d-flex flex-column flex-grow-1">
        <TopBar />
        <div className="container mt-4">
          <h2 className="fw-bold text-primary text-center mb-4">Gestión de Usuarios</h2>

          <div className="mb-4 text-center">
            <Button text="Agregar Usuario" onClick={() => router.push("/user-create")} className="btn-success" />
          </div>

          <UserTable users={users} onDelete={handleDeleteUser} onEdit={handleEditUser} />
        </div>
      </div>

      {/* Modal flotante para edición */}
      <UserEditModal show={showEditModal} handleClose={() => setShowEditModal(false)} user={selectedUser} onSave={handleSaveUser} />
    </div>
  );
};

export default UserManagement;
