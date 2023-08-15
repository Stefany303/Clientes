"use client";
import React, { useState, useEffect } from 'react';

const ClientesFormulario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [clientes, setClientes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }, [clientes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== -1) {
      const clientesCopy = [...clientes];
      clientesCopy[editingIndex] = {
        nombre,
        apellido,
        email,
        telefono,
      };
      setClientes(clientesCopy);
      setEditingIndex(-1);
    } else {
      const nuevoCliente = {
        nombre,
        apellido,
        email,
        telefono,
      };
      setClientes([...clientes, nuevoCliente]);
    }

    setNombre('');
    setApellido('');
    setEmail('');
    setTelefono('');
  };

  const handleEdit = (index) => {
    const cliente = clientes[index];
    setNombre(cliente.nombre);
    setApellido(cliente.apellido);
    setEmail(cliente.email);
    setTelefono(cliente.telefono);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const clientesCopy = [...clientes];
    clientesCopy.splice(index, 1);
    setClientes(clientesCopy);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg p-8 shadow-md w-1/3">
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="block mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <label htmlFor="apellido" className="block mb-2">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <label htmlFor="telefono" className="block mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <button
            type="submit"
            className="flex justify-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {editingIndex !== -1 ? 'Actualizar' : 'Guardar'}
          </button>
        </form>
      </div>
      <div className="ml-8">
        <h2 className="text-xl font-bold mb-2">Clientes:</h2>
        {clientes.map((cliente, index) => (
          <div key={index} className="mb-4">
            <p className="mb-2">
              Nombre: {cliente.nombre} {cliente.apellido}
            </p>
            <p className="mb-2">Email: {cliente.email}</p>
            <p className="mb-2">Teléfono: {cliente.telefono}</p>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
              onClick={() => handleEdit(index)}
            >
              Editar
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => handleDelete(index)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientesFormulario;
