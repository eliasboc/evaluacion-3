"use client";

import { useMemo } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { EventCard } from "~~/components/EventCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: userAddress } = useAccount();

  // smart contract
  const { data: events, isLoading: isLoadingEvents } = useScaffoldReadContract({
    contractName: "EventManager",
    functionName: "getAllEvents",
  });

  const { data: owner } = useScaffoldReadContract({
    contractName: "EventManager",
    functionName: "owner",
  });

  const activeEvents = useMemo(() => events?.filter(e => e.isActive), [events]);
  const upcomingEvents = useMemo(() => events?.filter(e => new Date(Number(e.date)) > new Date()), [events]);

  // 1. Manejo del estado de carga (Loading State)
  if (isLoadingEvents || userAddress === undefined || owner === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg font-medium animate-pulse">Cargando eventos desde la blockchain...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="space-y-8 px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-center tracking-tight text-base-content">Eventos Disponibles</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm">
            <p className="text-sm font-medium opacity-60">Eventos Activos</p>
            <p className="mt-2 text-3xl font-bold">{activeEvents?.length || 0}</p>
          </div>
          <div className="rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm">
            <p className="text-sm font-medium opacity-60">Próximos Eventos</p>
            <p className="mt-2 text-3xl font-bold">{upcomingEvents?.length || 0}</p>
          </div>
          <div className="rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm">
            <p className="text-sm font-medium opacity-60">Total de Registros</p>
            <p className="mt-2 text-3xl font-bold">
              {events?.reduce((acc, e) => acc + Number(e.registeredCount), 0) || 0}
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events?.map((event, key) => (
            <EventCard
              key={key}
              eventId={event.id}
              name={event.name}
              description={event.description}
              date={new Date(Number(event.date))}
              maxCapacity={Number(event.maxCapacity)}
              registeredCount={Number(event.registeredCount)}
              isActive={event.isActive}
              userAddress={userAddress}
              owner={owner}
            />
          ))}
        </div>

        {/* Empty State - Solo se muestra si ya cargó y no hay nada */}
        {!isLoadingEvents && events?.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-base-300 bg-base-200/50 py-20 text-center">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-xl font-bold opacity-80">No hay eventos disponibles</p>
            <p className="mt-2 opacity-60">Próximamente anunciaremos nuevos eventos académicos.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
