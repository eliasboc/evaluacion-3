"use client";

import { CalendarIcon, UserIcon } from "@heroicons/react/20/solid";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface EventCardProps {
  eventId: bigint;
  name: string;
  date: Date;
  maxCapacity: number;
  registeredCount: number;
  isActive: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  eventId,
  name,
  date,
  maxCapacity,
  registeredCount,
  isActive,
}) => {
  const capacityPercentage = (registeredCount / maxCapacity) * 100;
  const availableSpots = maxCapacity - registeredCount;
  const isFull = registeredCount >= maxCapacity;

  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //smart contract
  const { writeContractAsync: writeRegisterAsync } = useScaffoldWriteContract({ contractName: "EventManager" });

  const handleRegister = async () => {
    try {
      await writeRegisterAsync({ functionName: "register", args: [eventId] });
    } catch (error) {
      console.error("Error al inscribirse:", error);
    }
  };

  return (
    <div className={`card bg-base-100 shadow-xl border border-base-300 ${!isActive ? "opacity-60" : ""}`}>
      <div className="card-body gap-4">
        {/* Estado y Título */}
        <div className="flex justify-between items-start gap-2">
          <h2 className="card-title text-xl font-bold leading-tight">{name}</h2>
          <div className={`badge ${isActive ? "badge-primary" : "badge-ghost"} whitespace-nowrap`}>
            {isActive ? "Activo" : "Inactivo"}
          </div>
        </div>

        {/* Fecha del Evento */}
        <div className="flex items-center gap-2 text-sm opacity-70">
          <CalendarIcon className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        {/* Barra de Progreso y Capacidad */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <div className="flex items-center gap-1">
              <UserIcon className="h-3 w-3" />
              <span>Capacidad</span>
            </div>
            <span>
              {registeredCount} / {maxCapacity}
            </span>
          </div>

          <progress
            className={`progress w-full ${
              isFull ? "progress-error" : capacityPercentage > 80 ? "progress-warning" : "progress-primary"
            }`}
            value={registeredCount}
            max={maxCapacity}
          ></progress>
        </div>

        {/* Estadísticas de Disponibilidad */}
        <div className="stats bg-base-200 shadow-inner">
          <div className="stat py-2 px-4">
            <div className="stat-title text-xs">Cupos disponibles</div>
            <div className={`stat-value text-lg ${isFull ? "text-error" : "text-base-content"}`}>
              {Math.max(availableSpots, 0)}
            </div>
          </div>
        </div>

        {/* Botón de Acción */}
        <div className="card-actions mt-2">
          <button
            className={`btn btn-block ${!isActive || isFull ? "btn-disabled" : "btn-primary"}`}
            onClick={handleRegister}
            disabled={!isActive || isFull}
          >
            {!isActive ? "Evento Inactivo" : isFull ? "Cupo Lleno" : "Inscribirme Ahora"}
          </button>
        </div>
      </div>
    </div>
  );
};
