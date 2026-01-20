import { Address } from "@scaffold-ui/components";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type ModalListProps = {
  name: string;
  eventId: bigint;
  owner: string;
  userAddress: string;
  handleVerify: (participant: string) => void;
};

type DataParticipantProps = {
  eventId: bigint;
  participant: string;
  handleVerify: (participant: string) => void;
};

const DataParticipant: React.FC<DataParticipantProps> = ({ eventId, participant, handleVerify }) => {
  const { data: confirmedAttendance } = useScaffoldReadContract({
    contractName: "EventManager",
    functionName: "confirmedAttendance",
    args: [eventId, participant],
  });

  return (
    <>
      <td className="text-center flex items-center justify-center">
        <Address address={participant} />
      </td>
      <td className="text-center">
        <button
          className={`btn btn-success btn-sm gap-1 ${confirmedAttendance ? "btn-disabled" : ""}`}
          onClick={() => handleVerify(participant)}
          disabled={confirmedAttendance}
        >
          <CheckBadgeIcon className="h-5 w-5" />
          {confirmedAttendance ? "Validado" : "Validar"}
        </button>
      </td>
    </>
  );
};

export const ModalList: React.FC<ModalListProps> = ({ name, eventId, owner, userAddress, handleVerify }) => {
  const { data: participants } = useScaffoldReadContract({
    contractName: "EventManager",
    functionName: "getParticipants",
    args: [eventId],
  });

  return (
    <dialog id={eventId.toString()} className="modal">
      <div className="modal-box w-11/12 max-w-3xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-xl mb-4 text-center">Inscritos: {name}</h3>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr className="bg-base-200">
                <th className="text-center">#</th>
                <th className="text-center">Dirección</th>
                {owner === userAddress && <th className="text-center">Acción</th>}
              </tr>
            </thead>
            <tbody>
              {/* Por ahora pongo una fila de ejemplo para que veas el diseño */}
              {participants?.map((participant, index) => {
                return (
                  <tr key={index}>
                    <th className="text-center">{index + 1}</th>
                    <DataParticipant eventId={eventId} participant={participant} handleVerify={handleVerify} />
                  </tr>
                );
              })}

              {participants?.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-base-content opacity-60">
                    No hay participantes inscritos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
