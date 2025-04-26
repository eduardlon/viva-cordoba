"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaHeart, FaArrowLeft, FaTrash } from "react-icons/fa";

// Definir interfaces para los tipos de datos
interface ElementoFavorito {
  id: number;
  nombre: string;
  ubicacion: string;
  precio: number;
  calificacion: number;
  imagenUrl: string;
  tipo: "alojamiento" | "experiencia";
}

export default function FavoritosPage() {
  // Estado para filtrar favoritos
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  
  // Estado para almacenar los elementos favoritos
  const [favoritos, setFavoritos] = useState<ElementoFavorito[]>([]);
  
  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const favoritosGuardados = localStorage.getItem("favoritos");
    if (favoritosGuardados) {
      setFavoritos(JSON.parse(favoritosGuardados));
    } else {
      // Datos de ejemplo para mostrar inicialmente
      const datosDemostracion: ElementoFavorito[] = [
        {
          id: 1,
          nombre: "Hotel Montería Plaza",
          ubicacion: "Centro, Montería",
          precio: 250000,
          calificacion: 4.5,
          imagenUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          tipo: "alojamiento"
        },
        {
          id: 2,
          nombre: "Paseo en Canoa por los Manglares",
          ubicacion: "San Antero, Córdoba",
          precio: 85000,
          calificacion: 4.8,
          imagenUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          tipo: "experiencia"
        },
        {
          id: 3,
          nombre: "Cabaña Río Sinú",
          ubicacion: "Ribera del Sinú, Montería",
          precio: 180000,
          calificacion: 4.2,
          imagenUrl: "https://images.unsplash.com/photo-1521782462922-9318be1cfd04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          tipo: "alojamiento"
        },
        {
          id: 4,
          nombre: "Taller de Artesanías en Caña Flecha",
          ubicacion: "Tuchín, Córdoba",
          precio: 70000,
          calificacion: 4.9,
          imagenUrl: "https://images.unsplash.com/photo-1513096010445-b8fe3006be35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          tipo: "experiencia"
        }
      ];
      setFavoritos(datosDemostracion);
      localStorage.setItem("favoritos", JSON.stringify(datosDemostracion));
    }
  }, []);

  // Filtrar favoritos según el tipo seleccionado
  const favoritosFiltrados = favoritos.filter(favorito => 
    filtroTipo === "todos" || favorito.tipo === filtroTipo
  );

  // Función para eliminar un elemento de favoritos
  const eliminarFavorito = (id: number) => {
    const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  // Función para formatear precio en pesos colombianos
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  // Componente para mostrar estrellas de calificación
  const RatingStars = ({ rating }: { rating: number }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra superior */}
      <div className="bg-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/turista" className="text-[#0F47AF] hover:text-[#078930] transition-colors">
            <FaArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-[#0F47AF]">Mis Favoritos</h1>
          <div className="w-6"></div> {/* Espacio para equilibrar el diseño */}
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Filtrar por:</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltroTipo("todos")}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroTipo === "todos" 
                  ? "bg-[#0F47AF] text-white" 
                  : "bg-gray-200 hover:bg-[#078930] hover:text-white"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltroTipo("alojamiento")}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroTipo === "alojamiento" 
                  ? "bg-[#0F47AF] text-white" 
                  : "bg-gray-200 hover:bg-[#078930] hover:text-white"
              }`}
            >
              Alojamientos
            </button>
            <button
              onClick={() => setFiltroTipo("experiencia")}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroTipo === "experiencia" 
                  ? "bg-[#0F47AF] text-white" 
                  : "bg-gray-200 hover:bg-[#078930] hover:text-white"
              }`}
            >
              Experiencias
            </button>
          </div>
        </div>
        
        {/* Lista de favoritos */}
        {favoritosFiltrados.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FaHeart className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tienes favoritos guardados</h3>
            <p className="text-gray-600 mb-4">
              {filtroTipo === "todos" 
                ? "Explora alojamientos y experiencias para añadir a tus favoritos" 
                : `No tienes ${filtroTipo === "alojamiento" ? "alojamientos" : "experiencias"} en tus favoritos`}
            </p>
            <Link href="/turista">
              <button className="px-6 py-2 bg-[#0F47AF] text-white rounded-md hover:bg-[#078930] transition-colors">
                Explorar destinos
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritosFiltrados.map((favorito) => (
              <div key={favorito.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="relative h-48 w-full">
                    <Image
                      src={favorito.imagenUrl}
                      alt={favorito.nombre}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <button 
                    onClick={() => eliminarFavorito(favorito.id)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                    aria-label="Eliminar de favoritos"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <span className="text-white text-xs font-medium px-2 py-1 bg-[#0F47AF] bg-opacity-80 rounded-full">
                      {favorito.tipo === "alojamiento" ? "Alojamiento" : "Experiencia"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#0F47AF] mb-1">{favorito.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-2">{favorito.ubicacion}</p>
                  <div className="flex items-center mb-2">
                    <RatingStars rating={favorito.calificacion} />
                    <span className="ml-2 text-sm text-gray-600">({favorito.calificacion})</span>
                  </div>
                  <p className="font-bold text-lg mb-3">
                    {formatearPrecio(favorito.precio)}
                    <span className="text-sm font-normal text-gray-600">
                      {favorito.tipo === "alojamiento" ? " / noche" : ""}
                    </span>
                  </p>
                  <Link 
                    href={favorito.tipo === "alojamiento" 
                      ? `/turista/alojamientos/${favorito.id}` 
                      : `/turista/experiencias/${favorito.id}`
                    }
                  >
                    <button className="w-full bg-[#0F47AF] hover:bg-[#078930] text-white py-2 rounded-lg transition-colors duration-300">
                      Ver detalles
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-white p-4 shadow-inner mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
          <p>© 2023 Turismo Córdoba - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}