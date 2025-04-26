"use client";

import Link from "next/link";
import { useState } from "react";

// Simulación de datos
const estadisticasMock = {
  totalReservas: 28,
  ingresosTotales: 3400000,
  alojamientos: 3,
  experiencias: 5,
  reservasPorMes: [
    { mes: "Enero", cantidad: 2 },
    { mes: "Febrero", cantidad: 3 },
    { mes: "Marzo", cantidad: 4 },
    { mes: "Abril", cantidad: 6 },
    { mes: "Mayo", cantidad: 7 },
    { mes: "Junio", cantidad: 6 },
  ],
  ocupacionPorAlojamiento: [
    { nombre: "Finca El Paraíso", ocupacion: 85 },
    { nombre: "Casa Campestre", ocupacion: 72 },
    { nombre: "Cabaña Río Sinú", ocupacion: 64 },
  ],
  ingresosPorExperiencia: [
    { nombre: "Tour Río Sinú", ingresos: 1200000 },
    { nombre: "Cabalgata Campestre", ingresos: 900000 },
    { nombre: "Avistamiento de aves", ingresos: 600000 },
    { nombre: "Gastronomía local", ingresos: 400000 },
    { nombre: "Pesca deportiva", ingresos: 300000 },
  ],
};

function BarChart({ data, color = "#15803d", height = 120 }: { data: { label: string; value: number }[]; color?: string; height?: number }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-[140px] w-full">
      {data.map((d, i) => (
        <div key={d.label} className="flex flex-col items-center flex-1">
          <div
            className="rounded-t-md"
            style={{
              height: `${(d.value / max) * height}px`,
              background: color,
              width: "80%",
              minWidth: "18px",
              transition: "height 0.3s",
            }}
            title={d.value.toString()}
          />
          <span className="text-xs mt-2 text-green-800 text-center break-words">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function PieChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let acc = 0;
  return (
    <svg width={140} height={140} viewBox="0 0 36 36" className="mx-auto">
      {data.map((d, i) => {
        const start = acc;
        const val = (d.value / total) * 100;
        acc += val;
        const r = 16;
        const cx = 18;
        const cy = 18;
        const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2;
        const endAngle = ((start + val) / 100) * 2 * Math.PI - Math.PI / 2;
        // Redondear los valores para evitar diferencias de precisión
        const x1 = parseFloat((cx + r * Math.cos(startAngle)).toFixed(6));
        const y1 = parseFloat((cy + r * Math.sin(startAngle)).toFixed(6));
        const x2 = parseFloat((cx + r * Math.cos(endAngle)).toFixed(6));
        const y2 = parseFloat((cy + r * Math.sin(endAngle)).toFixed(6));
        const largeArc = val > 50 ? 1 : 0;
        return (
          <path
            key={d.label}
            d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`}
            fill={d.color}
            stroke="#fff"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
}

export default function Estadisticas() {
  const [estadisticas] = useState(estadisticasMock);

  // Datos para gráficos
  const reservasMesData = estadisticas.reservasPorMes.map((item) => ({
    label: item.mes.substring(0, 3),
    value: item.cantidad,
  }));

  const ocupacionData = estadisticas.ocupacionPorAlojamiento.map((item) => ({
    label: item.nombre.split(" ")[1], // Solo el nombre corto
    value: item.ocupacion,
  }));

  const ingresosExperienciaData = estadisticas.ingresosPorExperiencia.map((item, i) => ({
    label: item.nombre,
    value: item.ingresos,
    color: ["#15803d", "#22c55e", "#4ade80", "#bbf7d0", "#a7f3d0"][i % 5],
  }));

  return (
    <div className="flex flex-col items-center min-h-screen relative bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 z-10 relative">
        {/* Botón de regreso */}
        <div className="flex items-center mb-6">
          <Link href="/anfitrion" className="text-blue-800 hover:underline flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-8 text-green-800">Dashboard de Estadísticas</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-green-50 rounded-lg p-6 flex flex-col items-center shadow border border-green-200">
            <span className="text-3xl font-bold text-green-800">{estadisticas.totalReservas}</span>
            <span className="text-green-700 mt-2 font-medium">Reservas totales</span>
          </div>
          <div className="bg-green-50 rounded-lg p-6 flex flex-col items-center shadow border border-green-200">
            <span className="text-3xl font-bold text-green-800">
              {estadisticas.ingresosTotales.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}
            </span>
            <span className="text-green-700 mt-2 font-medium">Ingresos totales</span>
          </div>
          <div className="bg-green-50 rounded-lg p-6 flex flex-col items-center shadow border border-green-200">
            <span className="text-3xl font-bold text-green-800">{estadisticas.alojamientos}</span>
            <span className="text-green-700 mt-2 font-medium">Alojamientos</span>
          </div>
          <div className="bg-green-50 rounded-lg p-6 flex flex-col items-center shadow border border-green-200">
            <span className="text-3xl font-bold text-green-800">{estadisticas.experiencias}</span>
            <span className="text-green-700 mt-2 font-medium">Experiencias</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Reservas por mes */}
          <div className="bg-green-50 rounded-lg p-6 shadow border border-green-200">
            <h2 className="text-lg font-semibold text-green-800 mb-4">Reservas por mes</h2>
            <BarChart data={reservasMesData} color="#15803d" />
          </div>
          {/* Ocupación por alojamiento */}
          <div className="bg-green-50 rounded-lg p-6 shadow border border-green-200">
            <h2 className="text-lg font-semibold text-green-800 mb-4">Ocupación por alojamiento (%)</h2>
            <BarChart data={ocupacionData} color="#22c55e" />
          </div>
          {/* Ingresos por experiencia */}
          <div className="bg-green-50 rounded-lg p-6 shadow border border-green-200 md:col-span-2">
            <h2 className="text-lg font-semibold text-green-800 mb-4">Ingresos por experiencia</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <PieChart data={ingresosExperienciaData} />
              <div className="flex-1">
                {ingresosExperienciaData.map((item) => (
                  <div key={item.label} className="flex items-center mb-2">
                    <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ background: item.color }} />
                    <span className="text-green-800 font-medium">{item.label}</span>
                    <span className="ml-auto text-green-700 font-semibold">
                      {item.value.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}