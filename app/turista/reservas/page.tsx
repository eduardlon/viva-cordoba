"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Definir interfaz para las reservas
interface Reserva {
  id: number;
  nombre: string;
  tipo: "alojamiento" | "experiencia";
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  precio: number;
  estado: "confirmada" | "pendiente" | "cancelada";
  imagenUrl: string;
}

export default function Reservas() {
  // Estado para filtrar reservas
  const [filtroEstado, setFiltroEstado] = useState<string>("todas");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");

  // Datos de ejemplo para reservas
  const reservas: Reserva[] = [
    {
      id: 1,
      nombre: "Hotel Manglar",
      tipo: "alojamiento",
      ubicacion: "Montería, Córdoba",
      fechaInicio: "2023-12-15",
      fechaFin: "2023-12-20",
      precio: 750000,
      estado: "confirmada",
      imagenUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/275362329.jpg?k=a01b9af866e7169a33f1db8e28a1c8fd3b3f9b698fb0ef4f4fbc7d02d4d3ad0f&o=&hp=1"
    },
    {
      id: 2,
      nombre: "Paseo en Canoa por los Manglares",
      tipo: "experiencia",
      ubicacion: "San Antero, Córdoba",
      fechaInicio: "2023-12-18",
      fechaFin: "2023-12-18",
      precio: 85000,
      estado: "confirmada",
      imagenUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 3,
      nombre: "Cabaña Río Sinú",
      tipo: "alojamiento",
      ubicacion: "Tierralta, Córdoba",
      fechaInicio: "2024-01-10",
      fechaFin: "2024-01-15",
      precio: 600000,
      estado: "pendiente",
      imagenUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/327385690.jpg?k=fb9e5d3ccdce4408dbc743268c3f0259023f15585ad7190f2cf9a1c879c66edd&o=&hp=1"
    },
    {
      id: 4,
      nombre: "Taller de Artesanías en Caña Flecha",
      tipo: "experiencia",
      ubicacion: "Tuchín, Córdoba",
      fechaInicio: "2023-11-25",
      fechaFin: "2023-11-25",
      precio: 70000,
      estado: "cancelada",
      imagenUrl: "https://images.unsplash.com/photo-1513096010445-b8fe3006be35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  // Filtrar reservas según los criterios seleccionados
  const reservasFiltradas = reservas.filter(reserva => {
    const cumpleFiltroEstado = filtroEstado === "todas" || reserva.estado === filtroEstado;
    const cumpleFiltroTipo = filtroTipo === "todos" || reserva.tipo === filtroTipo;
    return cumpleFiltroEstado && cumpleFiltroTipo;
  });

  // Función para formatear fecha
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Función para formatear precio en pesos colombianos
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  // Función para obtener color según estado
  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case "confirmada":
        return "bg-green-100 text-green-800";
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Barra superior */}
      <div className="bg-white p-4 shadow-md flex justify-between items-center">
        <Link href="/turista" className="text-[#0F47AF] hover:text-[#078930] transition-colors">
          <span className="flex items-center p-2 rounded-full hover:bg-gray-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </span>
        </Link>
        <h1 className="text-xl font-bold text-center text-[#0F47AF]">Mis Reservas</h1>
        <div className="w-6"></div> {/* Espacio para equilibrar el diseño */}
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 shadow-sm mb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {/* Filtro por estado */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F47AF]"
              >
                <option value="todas">Todas</option>
                <option value="confirmada">Confirmadas</option>
                <option value="pendiente">Pendientes</option>
                <option value="cancelada">Canceladas</option>
              </select>
            </div>
            
            {/* Filtro por tipo */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F47AF]"
              >
                <option value="todos">Todos</option>
                <option value="alojamiento">Alojamientos</option>
                <option value="experiencia">Experiencias</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de reservas */}
      <div className="flex-grow p-4">
        <div className="max-w-4xl mx-auto">
          {reservasFiltradas.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-700 text-lg">No tienes reservas con los filtros seleccionados.</p>
              <button 
                className="mt-4 px-4 py-2 bg-[#0F47AF] text-white rounded-md hover:bg-[#0D3E9A] transition-colors"
                onClick={() => {
                  setFiltroEstado("todas");
                  setFiltroTipo("todos");
                }}
              >
                Ver todas las reservas
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {reservasFiltradas.map((reserva) => (
                <div key={reserva.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="md:flex">
                    {/* Imagen */}
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <Image 
                        src={reserva.imagenUrl} 
                        alt={reserva.nombre}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    
                    {/* Información */}
                    <div className="p-4 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-[#0F47AF]">{reserva.nombre}</h2>
                          <p className="text-gray-600">{reserva.ubicacion}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${obtenerColorEstado(reserva.estado)}`}>
                          {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
                        </span>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Tipo:</span> {reserva.tipo === "alojamiento" ? "Alojamiento" : "Experiencia"}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Fecha:</span> {formatearFecha(reserva.fechaInicio)}
                          {reserva.fechaFin !== reserva.fechaInicio && ` - ${formatearFecha(reserva.fechaFin)}`}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Precio total:</span> {formatearPrecio(reserva.precio)}
                        </p>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link href={`/turista/reservas/${reserva.id}`}>
                          <button className="px-4 py-2 bg-[#0F47AF] text-white rounded-md hover:bg-[#0D3E9A] transition-colors text-sm">
                            Ver detalles
                          </button>
                        </Link>
                        
                        {reserva.estado !== "cancelada" && (
                          <button className="px-4 py-2 bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors text-sm">
                            Cancelar reserva
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white p-4 shadow-inner mt-auto">
        <div className="max-w-4xl mx-auto text-center text-gray-600 text-sm">
          <p>© 2023 Turismo Córdoba - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}