"use client";

import { ModalList } from "./ModalList";
import { CalendarIcon, EyeIcon, UserIcon } from "@heroicons/react/20/solid";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface EventCardProps {
  eventId: bigint;
  name: string;
  description: string;
  date: Date;
  maxCapacity: number;
  registeredCount: number;
  isActive: boolean;
  userAddress: string;
  owner: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  eventId,
  name,
  description,
  date,
  maxCapacity,
  registeredCount,
  isActive,
  userAddress,
  owner,
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
  const { writeContractAsync: writeEventAsync } = useScaffoldWriteContract({
    contractName: "EventManager",
  });

  const { data: hasParticipant } = useScaffoldReadContract({
    contractName: "EventManager",
    functionName: "participantRegistry",
    args: [eventId, userAddress],
  });

  const handleRegister = async () => {
    try {
      await writeEventAsync({ functionName: "register", args: [eventId] });
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerify = async (address: string) => {
    try {
      await writeEventAsync({
        functionName: "validateAttendance",
        args: [eventId, address],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`card bg-base-100 shadow-xl border border-base-300 ${!isActive ? "opacity-60" : ""}`}>
      <ModalList name={name} eventId={eventId} owner={owner} userAddress={userAddress} handleVerify={handleVerify} />
      <div className="card-body gap-4">
        <div className="flex justify-between items-start gap-2">
          <h2 className="card-title text-xl font-bold leading-tight">{name}</h2>
          <div className="flex items-center gap-2">
            <div className="tooltip tooltip-left" data-tip="Ver inscritos">
              <button
                className="btn btn-secondary btn-sm btn-circle"
                onClick={() => (document.getElementById(eventId.toString()) as HTMLDialogElement).showModal()}
              >
                <EyeIcon className="h-5 w-5 opacity-70" />
              </button>
            </div>
            <div className={`badge ${isActive ? "badge-primary" : "badge-ghost"}`}>
              {isActive ? "Activo" : "Inactivo"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm opacity-70">
          <CalendarIcon className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        <p className="text-sm opacity-80 leading-relaxed line-clamp-2">{description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="flex items-center gap-1">
              <UserIcon className="h-3 w-3" /> Capacidad
            </span>
            <span>
              {registeredCount} / {maxCapacity}
            </span>
          </div>
          <progress
            className={`progress w-full ${isFull ? "progress-error" : capacityPercentage > 80 ? "progress-warning" : "progress-primary"}`}
            value={registeredCount}
            max={maxCapacity}
          ></progress>
        </div>

        <div className="stats bg-base-200 shadow-inner">
          <div className="stat py-2 px-4">
            <div className="stat-title text-xs text-base-content opacity-60">Cupos disponibles</div>
            <div className={`stat-value text-lg ${isFull ? "text-error" : "text-base-content"}`}>
              {Math.max(availableSpots, 0)}
            </div>
          </div>
        </div>

        <div className="card-actions mt-2">
          <button
            className={`btn btn-block ${!isActive || isFull ? "btn-disabled" : "btn-primary"}`}
            onClick={handleRegister}
            disabled={!isActive || isFull || hasParticipant || owner === userAddress}
          >
            {!isActive
              ? "Evento Inactivo"
              : isFull
                ? "Cupo Lleno"
                : hasParticipant
                  ? "Ya inscrito"
                  : "Inscribirme Ahora"}
          </button>
        </div>
      </div>
    </div>
  );
};
