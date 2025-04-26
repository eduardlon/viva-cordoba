"use client";

import { useState } from "react";
import Link from "next/link";

type Habitacion = {
  id: number;
  nombre: string;
  imagen: string | null;
  precio: number;
  servicios: string[];
};

type Paquete = {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string | null;
};

const serviciosDisponibles = [
  "WiFi",
  "Aire acondicionado",
  "Desayuno incluido",
  "Piscina",
  "Parqueadero",
  "TV por cable",
  "Gimnasio",
  "Restaurante",
];

const habitacionesEjemplo: Habitacion[] = [
  {
    id: 1,
    nombre: "Habitación Estándar",
    imagen: null,
    precio: 180000,
    servicios: ["WiFi", "Aire acondicionado", "Desayuno incluido"],
  },
  {
    id: 2,
    nombre: "Suite Ejecutiva",
    imagen: null,
    precio: 320000,
    servicios: ["WiFi", "Aire acondicionado", "Desayuno incluido", "Piscina", "TV por cable"],
  },
];

const paqueteEjemplo: Paquete = {
  nombre: "Paquete Montería Plaza VIP",
  descripcion:
    "Incluye 2 noches en Suite Ejecutiva, desayuno incluido, tour por el río Sinú, acceso a piscina y cena especial en el restaurante del hotel.",
  precio: 650000,
  imagen: null,
};

export default function PerfilAnfitrion() {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>(habitacionesEjemplo);

  // Paquete turístico
  const [paquete, setPaquete] = useState<Paquete>(paqueteEjemplo);

  const handleImagen = (idx: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setHabitaciones((prev) =>
        prev.map((h, i) =>
          i === idx ? { ...h, imagen: e.target?.result as string } : h
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handlePrecio = (idx: number, precio: number) => {
    setHabitaciones((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, precio } : h))
    );
  };

  const handleServicios = (idx: number, servicio: string) => {
    setHabitaciones((prev) =>
      prev.map((h, i) =>
        i === idx
          ? {
              ...h,
              servicios: h.servicios.includes(servicio)
                ? h.servicios.filter((s) => s !== servicio)
                : [...h.servicios, servicio],
            }
          : h
      )
    );
  };

  // Paquete turístico handlers
  const handlePaqueteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaquete((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) : value,
    }));
  };

  const handlePaqueteImagen = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPaquete((prev) => ({
        ...prev,
        imagen: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 z-10 relative">
        {/* Botón de regreso */}
        <div className="flex items-center mb-6">
          <Link href="/anfitrion" className="text-blue-800 hover:underline flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-8 text-green-800">Perfil del Hotel Montería Plaza</h1>
        <div className="space-y-10">
          {habitaciones.map((habitacion, idx) => (
            <div key={habitacion.id} className="bg-green-50 rounded-lg p-6 shadow border border-green-200">
              <h2 className="text-xl font-semibold text-green-800 mb-4">{habitacion.nombre}</h2>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Imagen */}
                <div className="flex flex-col items-center w-full md:w-1/3">
                  <label
                    htmlFor={`imagen-${habitacion.id}`}
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-green-400 rounded-lg cursor-pointer transition hover:border-green-700 bg-green-100"
                  >
                    {habitacion.imagen ? (
                      <img
                        src={habitacion.imagen}
                        alt="Imagen habitación"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-green-600 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4-4a3 3 0 014 0l4 4M4 16V8a2 2 0 012-2h12a2 2 0 012 2v8M4 16h16"
                          />
                        </svg>
                        <span className="text-green-700 font-medium text-center">
                          Haz clic para subir una imagen
                        </span>
                        <span className="text-xs text-green-500 mt-1">
                          JPG, PNG o WEBP (máx. 5MB)
                        </span>
                      </div>
                    )}
                    <input
                      id={`imagen-${habitacion.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e =>
                        handleImagen(idx, e.target.files ? e.target.files[0] : null)
                      }
                    />
                  </label>
                </div>
                {/* Edición de precio y servicios */}
                <div className="flex-1 flex flex-col gap-4">
                  <div>
                    <label className="block text-green-800 font-semibold mb-2">Precio por noche (COP)</label>
                    <input
                      type="number"
                      min={0}
                      value={habitacion.precio}
                      onChange={e => handlePrecio(idx, Number(e.target.value))}
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-green-800 font-semibold mb-2">Servicios adicionales</label>
                    <div className="flex flex-wrap gap-2">
                      {serviciosDisponibles.map(servicio => (
                        <label
                          key={servicio}
                          className={`px-3 py-2 rounded-lg border cursor-pointer text-sm ${
                            habitacion.servicios.includes(servicio)
                              ? "bg-green-700 text-white border-green-700"
                              : "bg-white text-green-800 border-green-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={habitacion.servicios.includes(servicio)}
                            onChange={() => handleServicios(idx, servicio)}
                            className="mr-2 accent-green-700"
                          />
                          {servicio}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Sección de paquete turístico */}
          <div className="bg-blue-50 rounded-lg p-6 shadow border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Oferta de Paquete Turístico</h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Imagen del paquete */}
              <div className="flex flex-col items-center w-full md:w-1/3">
                <label
                  htmlFor="imagen-paquete"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer transition hover:border-blue-700 bg-blue-100"
                >
                  {paquete.imagen ? (
                    <img
                      src={paquete.imagen}
                      alt="Imagen paquete"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-blue-600 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4-4a3 3 0 014 0l4 4M4 16V8a2 2 0 012-2h12a2 2 0 012 2v8M4 16h16"
                        />
                      </svg>
                      <span className="text-blue-700 font-medium text-center">
                        Haz clic para subir una imagen
                      </span>
                      <span className="text-xs text-blue-500 mt-1">
                        JPG, PNG o WEBP (máx. 5MB)
                      </span>
                    </div>
                  )}
                  <input
                    id="imagen-paquete"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e =>
                      handlePaqueteImagen(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </label>
              </div>
              {/* Edición de datos del paquete */}
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <label className="block text-blue-800 font-semibold mb-2">Nombre del paquete</label>
                  <input
                    type="text"
                    name="nombre"
                    value={paquete.nombre}
                    onChange={handlePaqueteChange}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
                  />
                </div>
                <div>
                  <label className="block text-blue-800 font-semibold mb-2">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={paquete.descripcion}
                    onChange={handlePaqueteChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 transition resize-none"
                  />
                </div>
                <div>
                  <label className="block text-blue-800 font-semibold mb-2">Precio del paquete (COP)</label>
                  <input
                    type="number"
                    name="precio"
                    min={0}
                    value={paquete.precio}
                    onChange={handlePaqueteChange}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-green-700 text-sm">
          Cambios guardados localmente. Integra tu backend para persistir la información.
        </div>
      </div>
    </div>
  );
}