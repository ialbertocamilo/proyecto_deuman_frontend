import { useState } from "react";
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
  password: string;
};

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Juan",
      lastName: "Pérez",
      email: "juan@example.com",
      phone: "123456789",
      birthDate: "1990-01-01",
      country: "Perú",
      ubigeo: "150101",
      password: "********",
    },
    {
      id: 2,
      name: "Ana",
      lastName: "Gómez",
      email: "ana@example.com",
      phone: "987654321",
      birthDate: "1985-05-15",
      country: "México",
      ubigeo: "010203",
      password: "********",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setShowEditModal(false);
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
