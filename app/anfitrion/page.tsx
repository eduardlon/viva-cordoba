"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Anfitrion() {
  return (
    <div className="flex flex-col items-center min-h-screen relative bg-gray-100 p-6">
      {/* Imagen de fondo usando Next Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sombrero.webp"
          alt="Sombrero Vueltiao - Símbolo de Córdoba"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 z-10 relative">
        {/* Botón de regreso */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-blue-800">
            <span className="flex items-center">
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
          
          {/* Menú de opciones (tres puntos) */}
          <button className="text-gray-600">
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
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-center mb-8">Anfitrión</h1>

        {/* Opciones de anfitrión */}
        <div className="space-y-5">
          <Link href="/anfitrion/subir-alojamiento" className="block">
            <button className="w-full bg-green-700 text-white py-4 px-5 rounded-lg font-semibold shadow-md hover:bg-green-800 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 tracking-wide text-lg flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 5v14M5 12h14"/></svg>
              SUBIR ALOJAMIENTO
            </button>
          </Link>

          <Link href="/anfitrion/agregar-experiencia" className="block">
            <button className="w-full bg-green-700 text-white py-4 px-5 rounded-lg font-semibold shadow-md hover:bg-green-800 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 tracking-wide text-lg flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
              AGREGAR EXPERIENCIA
            </button>
          </Link>

          <Link href="/anfitrion/ver-reservas" className="block">
            <button className="w-full bg-green-700 text-white py-4 px-5 rounded-lg font-semibold shadow-md hover:bg-green-800 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 tracking-wide text-lg flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              VER RESERVAS
            </button>
          </Link>

          <Link href="/anfitrion/estadisticas" className="block">
            <button className="w-full bg-green-700 text-white py-4 px-5 rounded-lg font-semibold shadow-md hover:bg-green-800 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 tracking-wide text-lg flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/></svg>
              ESTADÍSTICAS
            </button>
          </Link>

          <Link href="/anfitrion/mensajes" className="block">
            <button className="w-full bg-green-700 text-white py-4 px-5 rounded-lg font-semibold shadow-md hover:bg-green-800 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 tracking-wide text-lg flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              MENSAJES
            </button>
          </Link>

          <Link href="/anfitrion/perfil" className="block">
            <button className="w-full bg-green-700 text-white py-4 px-5 rounded-lg font-semibold shadow-md hover:bg-green-800 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 tracking-wide text-lg flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="8" r="4"/><path d="M16 16v1a4 4 0 0 1-8 0v-1"/></svg>
              MI PERFIL
            </button>
          </Link>
        </div>
        
        {/* Información adicional */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>¿Necesitas ayuda con tu alojamiento?</p>
          <Link href="/ayuda" className="text-blue-800 font-medium hover:underline">
            Centro de ayuda para anfitriones
          </Link>
        </div>
      </div>
    </div>
  );
}