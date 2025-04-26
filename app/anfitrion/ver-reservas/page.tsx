"use client";

import Link from "next/link";
import { useState } from "react";

type Reserva = {
  id: number;
  huesped: string;
  alojamiento: string;
  fechaEntrada: string;
  fechaSalida: string;
  estado: "Pendiente" | "Confirmada" | "Cancelada";
};

const reservasMock: Reserva[] = [
  {
    id: 1,
    huesped: "Juan Pérez",
    alojamiento: "Finca El Paraíso",
    fechaEntrada: "2025-05-10",
    fechaSalida: "2025-05-15",
    estado: "Confirmada",
  },
  {
    id: 2,
    huesped: "Ana Gómez",
    alojamiento: "Casa Campestre",
    fechaEntrada: "2025-06-01",
    fechaSalida: "2025-06-03",
    estado: "Pendiente",
  },
  {
    id: 3,
    huesped: "Carlos Ruiz",
    alojamiento: "Cabaña Río Sinú",
    fechaEntrada: "2025-05-20",
    fechaSalida: "2025-05-22",
    estado: "Cancelada",
  },
];

export default function VerReservas() {
  const [reservas] = useState(reservasMock);

  return (
    <div className="flex flex-col items-center min-h-screen relative bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 z-10 relative">
        {/* Botón de regreso */}
        <div className="flex items-center mb-6">
          <Link href="/anfitrion" className="text-blue-800 hover:underline flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-8 text-green-800">Mis Reservas</h1>
        {reservas.length === 0 ? (
          <div className="text-center text-gray-500">No tienes reservas registradas.</div>
        ) : (
          <div className="space-y-6">
            {reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="border border-green-200 rounded-lg p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between bg-green-50"
              >
                <div>
                  <div className="font-semibold text-green-800 text-lg">{reserva.alojamiento}</div>
                  <div className="text-gray-700">Huésped: <span className="font-medium">{reserva.huesped}</span></div>
                  <div className="text-gray-700">
                    Entrada: <span className="font-medium">{reserva.fechaEntrada}</span> | Salida: <span className="font-medium">{reserva.fechaSalida}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      reserva.estado === "Confirmada"
                        ? "bg-green-700 text-white"
                        : reserva.estado === "Pendiente"
                        ? "bg-yellow-400 text-white"
                        : "bg-red-400 text-white"
                    }`}
                  >
                    {reserva.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}