import { useState } from 'react';

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
import Navbar from '../src/components/layout/Navbar';
import TopBar from '../src/components/layout/TopBar';
import UserForm from '../src/components/forms/UserForm';
import UserTable from '../src/components/forms/UserTable';
import Button from '../src/components/common/Button';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Juan',
      lastName: 'Pérez',
      email: 'juan@example.com',
      phone: '123456789',
      birthDate: '1990-01-01',
      country: 'Perú',
      ubigeo: '150101',
      password: '********'
    },
    {
      id: 2,
      name: 'Ana',
      lastName: 'Gómez',
      email: 'ana@example.com',
      phone: '987654321',
      birthDate: '1985-05-15',
      country: 'México',
      ubigeo: '010203',
      password: '********'
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  // Agregar usuario
  const handleAddUser = (user: { name: string; lastName: string; email: string; phone: string; birthDate: string; country: string; ubigeo: string; password: string }) => {
    setUsers([...users, { id: users.length + 1, ...user }]);
  };

  // Actualizar usuario
  const handleUpdateUser = (updatedUser: { id: number; name: string; lastName: string; email: string; phone: string; birthDate: string; country: string; ubigeo: string; password: string }) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setSelectedUser(undefined);
  };

  // Eliminar usuario
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="d-flex">
      <Navbar setActiveView={() => {}} />
      <div className="d-flex flex-column flex-grow-1">
        <TopBar />
        <div className="container mt-4">
          <h2 className="fw-bold text-primary text-center mb-4">Gestión de Usuarios</h2>

          <div className="mb-4 text-center">
            <Button
              text="Agregar Usuario"
              onClick={() => setSelectedUser(undefined)}
              className="btn-success"
            />
          </div>

          <UserForm 
            onSubmit={handleAddUser} 
            selectedUser={selectedUser} 
            onUpdate={handleUpdateUser} 
          />

          <UserTable 
            users={users} 
            onDelete={handleDeleteUser} 
            onEdit={setSelectedUser} 
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
