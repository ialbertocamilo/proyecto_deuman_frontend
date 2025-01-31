import { useState } from "react";
import UserForm from "../src/components/forms/UserForm";
import Navbar from "../src/components/layout/Navbar";
import TopBar from "../src/components/layout/TopBar";
import { useRouter } from "next/router";
import Button from "../src/components/common/Button";

const UserCreate = () => {
  interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    country: string;
    ubigeo: string;
    password: string;
  }
  
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const handleAddUser = (user: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    country: string;
    ubigeo: string;
    password: string;
  }) => {
    setUsers([...users, { id: users.length + 1, ...user }]);
  };

  return (
    <div className="d-flex">
      <Navbar setActiveView={() => {}} />
      <div className="d-flex flex-column flex-grow-1">
        <TopBar />
        <div className="container mt-4">
          <h2 className="fw-bold text-primary text-center mb-4">Crear Usuario</h2>

          <div className="mb-4">
            <Button text="Volver a Gestión de Usuarios" onClick={() => router.push("/user-management")} className="btn-secondary" />
          </div>

          <UserForm onSubmit={handleAddUser} selectedUser={undefined} onUpdate={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
