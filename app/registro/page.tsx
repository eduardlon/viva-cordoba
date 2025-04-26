"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Registro() {
  const [userType, setUserType] = useState("turista");

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* Botón de regreso */}
        <div className="mb-6">
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
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-center mb-8">Registro</h1>

        {/* Formulario */}
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Correo-electrónico"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors uppercase"
          >
            Registrarme
          </button>
        </form>

        {/* Opciones de tipo de usuario */}
        <div className="mt-6 flex flex-col space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="turista"
              name="userType"
              checked={userType === "turista"}
              onChange={() => setUserType("turista")}
              className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300"
            />
            <label htmlFor="turista" className="ml-2 text-sm font-medium text-gray-700">
              Soy turista
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="anfitrion"
              name="userType"
              checked={userType === "anfitrion"}
              onChange={() => setUserType("anfitrion")}
              className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300"
            />
            <label htmlFor="anfitrion" className="ml-2 text-sm font-medium text-gray-700">
              Soy anfitrión
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}