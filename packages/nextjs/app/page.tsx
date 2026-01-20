"use client";

// import Link from "next/link";
// import { Address } from "@scaffold-ui/components";
import type { NextPage } from "next";
// import { hardhat } from "viem/chains";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EventCard } from "~~/components/EventCard";

// import { useTargetNetwork } from "~~/hooks/scaffold-eth";

const MOCK_EVENTS: any[] = [
  {
    name: "Workshop de React",
    date: "2026-02-15",
    maxCapacity: 30,
    registeredCount: 28,
    isActive: true,
  },
  {
    name: "Conferencia de Next.js",
    date: "2026-03-01",
    maxCapacity: 50,
    registeredCount: 45,
    isActive: true,
  },
  {
    name: "Taller de TypeScript",
    date: "2026-03-10",
    maxCapacity: 25,
    registeredCount: 25,
    isActive: true,
  },
  {
    name: "Webinar de Performance",
    date: "2026-02-28",
    maxCapacity: 100,
    registeredCount: 35,
    isActive: true,
  },
  {
    name: "Meetup de Developers",
    date: "2026-01-30",
    maxCapacity: 40,
    registeredCount: 15,
    isActive: false,
  },
  {
    name: "Hackathon Web3",
    date: "2026-04-05",
    maxCapacity: 60,
    registeredCount: 22,
    isActive: true,
  },
];

//TODO: debo poner un modal en el form para asi botar al estudiante cuando se meta
//TODO: ver si me da chance de crear los NFT
const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();
  // const { targetNetwork } = useTargetNetwork();

  const activeEvents = MOCK_EVENTS.filter(e => e.isActive);
  const upcomingEvents = MOCK_EVENTS.filter(e => new Date(e.date) > new Date());

  return (
    <main>
      <section className="space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Eventos Disponibles</h1>
          <p className="text-lg text-muted-foreground">
            Descubre y regístrate en nuestros próximos eventos. Tenemos {activeEvents.length} evento
            {activeEvents.length !== 1 ? "s" : ""} activo
            {activeEvents.length !== 1 ? "s" : ""}.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm font-medium text-muted-foreground">Eventos Activos</p>
            <p className="mt-2 text-3xl font-bold">{activeEvents.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm font-medium text-muted-foreground">Próximos Eventos</p>
            <p className="mt-2 text-3xl font-bold">{upcomingEvents.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm font-medium text-muted-foreground">Total de Registros</p>
            <p className="mt-2 text-3xl font-bold">{MOCK_EVENTS.reduce((acc, e) => acc + e.registeredCount, 0)}</p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_EVENTS.map((event, key) => (
            <EventCard
              key={key}
              name={event.name}
              date={event.date}
              maxCapacity={event.maxCapacity}
              registeredCount={event.registeredCount}
              isActive={event.isActive}
            />
          ))}
        </div>

        {/* Empty State */}
        {MOCK_EVENTS.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 py-12">
            <p className="text-lg font-medium text-muted-foreground">No hay eventos disponibles</p>
            <p className="mt-2 text-sm text-muted-foreground">Próximamente anunciaremos nuevos eventos</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
