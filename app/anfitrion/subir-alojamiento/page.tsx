"use client";

import { useState } from "react";
import Link from "next/link";

export default function SubirAlojamiento() {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    descripcion: "",
    precio: "",
    imagen: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "imagen" && files && files[0]) {
      setForm({ ...form, imagen: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert("Alojamiento enviado (simulado)");
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 z-10 relative">
        {/* Botón de regreso */}
        <div className="flex items-center mb-6">
          <Link href="/anfitrion" className="text-blue-800 hover:underline flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-8 text-green-800">Subir Alojamiento</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-green-800 font-semibold mb-2">Nombre del alojamiento</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition"
              placeholder="Ej: Finca El Paraíso"
            />
          </div>
          <div>
            <label className="block text-green-800 font-semibold mb-2">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition"
              placeholder="Ej: Calle 123, Montería"
            />
          </div>
          <div>
            <label className="block text-green-800 font-semibold mb-2">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition resize-none"
              placeholder="Describe tu alojamiento..."
            />
          </div>
          <div>
            <label className="block text-green-800 font-semibold mb-2">Precio por noche (COP)</label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              required
              min={0}
              className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition"
              placeholder="Ej: 120000"
            />
          </div>
          <div>
            <label className="block text-green-800 font-semibold mb-2">Imagen principal</label>
            <div className="flex flex-col items-center">
              <label
                htmlFor="imagen"
                className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-green-400 rounded-lg cursor-pointer transition hover:border-green-700 bg-green-50 ${
                  preview ? "p-0" : "p-6"
                }`}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Vista previa"
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
                    <span className="text-green-700 font-medium">
                      Haz clic para subir una imagen
                    </span>
                    <span className="text-xs text-green-500 mt-1">
                      JPG, PNG o WEBP (máx. 5MB)
                    </span>
                  </div>
                )}
                <input
                  id="imagen"
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-4 px-5 rounded-lg font-semibold shadow-md hover:bg-green-800 hover:shadow-lg transition-all duration-200 tracking-wide text-lg flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 5v14M5 12h14"/></svg>
            Subir alojamiento
          </button>
        </form>
      </div>
    </div>
  );
}