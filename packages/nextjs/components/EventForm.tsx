"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type EventFormProps = {
  userAddress: string;
  owner: string;
};

export const EventForm: React.FC<EventFormProps> = ({ userAddress, owner }) => {
  //states
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    capacity: "",
  });

  //smart contract

  const { writeContractAsync: writeEventManagementAsync } = useScaffoldWriteContract({
    contractName: "EventManager",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.name && formData.date && formData.capacity) {
        await writeEventManagementAsync({
          functionName: "createEvent",
          args: [
            formData.name,
            formData.description,
            BigInt(new Date(formData.date).getTime()),
            BigInt(formData.capacity),
          ],
        });
        setFormData({ name: "", description: "", date: "", capacity: "" });
      } else {
        toast.error("Por favor, complete todos los campos");
      }
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  return (
    <div className="card w-full max-w-xl mx-auto bg-base-100 shadow-2xl border border-base-300 min-h-[550px]">
      <div className="card-body p-10">
        <h2 className="card-title text-3xl font-extrabold mb-8 text-center">Crear Nuevo Evento</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base">Nombre del Evento *</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Ethereum Summit 2026"
              className="input input-bordered input-lg w-full focus:input-primary transition-all rounded-md"
              required
            />
          </div>
          {/* Descripción */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base">Descripción del Evento *</span>
            </label>
            <textarea
              className="textarea h-12 w-full rounded-md"
              placeholder="Descripción del Evento"
              value={formData.description}
              onChange={handleChange}
              name="description"
              required
            ></textarea>
          </div>
          {/* Fecha */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base">Fecha y Hora *</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered input-lg w-full focus:input-primary rounded-md"
              required
            />
          </div>
          {/* Capacidad */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base">Capacidad Máxima *</span>
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Ej: 100"
              className="input input-bordered input-lg w-full focus:input-primary rounded-md"
              min="1"
              required
            />
          </div>
          {/* Botón */}
          <div className="card-actions mt-10">
            <button
              type="submit"
              disabled={userAddress !== owner}
              className="btn btn-primary btn-lg btn-block shadow-md hover:shadow-xl transition-all"
            >
              Publicar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
