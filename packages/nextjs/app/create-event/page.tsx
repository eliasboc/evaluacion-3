"use client";

import { useAccount } from "wagmi";
import { EventForm } from "~~/components/EventForm";
import { ModalAdmin } from "~~/components/ModalAdmin";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function Home() {
  const { address: userAddress } = useAccount();

  // Smart contract - Obtenemos el owner
  const { data: owner, isLoading: isLoadingOwner } = useScaffoldReadContract({
    contractName: "EventManager",
    functionName: "owner",
  });

  if (userAddress === undefined || isLoadingOwner || owner === undefined) {
    return (
      <main className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          {/* Loader de DaisyUI */}
          <span className="loading loading-infinity loading-lg text-primary scale-150"></span>

          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold animate-pulse">Conectando con la red...</h2>
            <p className="text-sm opacity-60">Verificando credenciales de administrador</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      {owner !== userAddress && <ModalAdmin />}

      <div className="w-full max-w-4xl animate-in fade-in zoom-in duration-300">
        <EventForm userAddress={userAddress} owner={owner} />
      </div>
    </main>
  );
}
