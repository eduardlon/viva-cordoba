"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Definir interfaz para las experiencias
interface Experiencia {
  id: number;
  nombre: string;
  ubicacion: string;
  precio: number;
  calificacion: number;
  imagenUrl: string;
  duracion: string;
  categoria: string;
  descripcion: string;
  incluye: string[];
  anfitrion: {
    nombre: string;
    calificacion: number;
    experiencia: string;
  };
}

// Datos de ejemplo para experiencias en Córdoba
const datosExperiencias: Experiencia[] = [
  {
    id: 1,
    nombre: "Paseo en Canoa por los Manglares",
    ubicacion: "San Antero, Córdoba",
    precio: 85000,
    calificacion: 4.8,
    imagenUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duracion: "3 horas",
    categoria: "Naturaleza",
    descripcion: "Explora los hermosos manglares de la Bahía de Cispatá en una auténtica canoa tradicional. Observa aves, peces y la rica biodiversidad de este ecosistema único.",
    incluye: ["Guía local", "Refrigerio", "Equipo de seguridad", "Fotos digitales"],
    anfitrion: {
      nombre: "Carlos Mendoza",
      calificacion: 4.9,
      experiencia: "10 años como guía de manglares"
    }
  },
  {
    id: 2,
    nombre: "Tour Gastronómico en Montería",
    ubicacion: "Montería, Córdoba",
    precio: 120000,
    calificacion: 4.7,
    imagenUrl: "https://images.unsplash.com/photo-1504674900247-b8fe3006be35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duracion: "4 horas",
    categoria: "Gastronomía",
    descripcion: "Descubre los sabores auténticos de Córdoba en este recorrido por los mejores restaurantes y puestos callejeros de Montería. Prueba platos tradicionales como el mote de queso, la carne a la plancha y los dulces típicos.",
    incluye: ["5 degustaciones", "Bebidas", "Guía gastronómico", "Recetario digital"],
    anfitrion: {
      nombre: "María Jiménez",
      calificacion: 4.8,
      experiencia: "Chef con 15 años de experiencia"
    }
  },
  {
    id: 3,
    nombre: "Cabalgata por el Río Sinú",
    ubicacion: "Tierralta, Córdoba",
    precio: 150000,
    calificacion: 4.6,
    imagenUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duracion: "5 horas",
    categoria: "Aventura",
    descripcion: "Disfruta de un paseo a caballo por las orillas del majestuoso río Sinú. Atraviesa paisajes impresionantes, bosques y pequeñas comunidades rurales mientras aprendes sobre la cultura local.",
    incluye: ["Caballo entrenado", "Instructor", "Almuerzo típico", "Transporte desde punto de encuentro"],
    anfitrion: {
      nombre: "Joaquín Pérez",
      calificacion: 4.7,
      experiencia: "Criador de caballos por más de 20 años"
    }
  },
  {
    id: 4,
    nombre: "Taller de Artesanías en Caña Flecha",
    ubicacion: "Tuchín, Córdoba",
    precio: 70000,
    calificacion: 4.9,
    imagenUrl: "https://images.unsplash.com/photo-1513096010445-b8fe3006be35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duracion: "3 horas",
    categoria: "Cultural",
    descripcion: "Aprende el arte ancestral del tejido en caña flecha con artesanos Zenú. Elabora tu propio sombrero vueltiao en miniatura y conoce la historia y significado de este símbolo nacional.",
    incluye: ["Materiales", "Refrigerio típico", "Artesanía para llevar", "Certificado"],
    anfitrion: {
      nombre: "Ana Talaigua",
      calificacion: 5.0,
      experiencia: "Maestra artesana de la comunidad Zenú"
    }
  },
  {
    id: 5,
    nombre: "Avistamiento de Aves en Ciénaga Grande",
    ubicacion: "Lorica, Córdoba",
    precio: 95000,
    calificacion: 4.8,
    imagenUrl: "https://images.unsplash.com/photo-1621494547431-5eabcbf89b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duracion: "6 horas",
    categoria: "Naturaleza",
    descripcion: "Observa más de 50 especies de aves en su hábitat natural en la Ciénaga Grande del Bajo Sinú. Un paraíso para los amantes de la ornitología y la fotografía de naturaleza.",
    incluye: ["Binoculares", "Guía especializado", "Desayuno campesino", "Transporte en lancha"],
    anfitrion: {
      nombre: "Roberto Díaz",
      calificacion: 4.9,
      experiencia: "Biólogo y fotógrafo de naturaleza"
    }
  },
  {
    id: 6,
    nombre: "Clase de Baile de Porro y Fandango",
    ubicacion: "San Pelayo, Córdoba",
    precio: 60000,
    calificacion: 4.7,
    imagenUrl: "https://images.unsplash.com/photo-1504609813442-a9924e2e4f5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duracion: "2 horas",
    categoria: "Cultural",
    descripcion: "Aprende los pasos básicos de los bailes tradicionales de Córdoba: el porro y el fandango. Una experiencia divertida para conectar con la cultura musical de la región.",
    incluye: ["Instructor profesional", "Bebidas refrescantes", "Presentación de músicos locales", "Video tutorial"],
    anfitrion: {
      nombre: "Lucía Martínez",
      calificacion: 4.8,
      experiencia: "Bailarina del Festival del Porro"
    }
  },
  {
    id: 7,
    nombre: "Pesca Artesanal con Pescadores Locales",
    ubicacion: "Moñitos, Córdoba",
    precio: 110000,
    calificacion: 4.5,
    imagenUrl: "https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duracion: "4 horas",
    categoria: "Aventura",
    descripcion: "Embárcate en una auténtica experiencia de pesca con pescadores tradicionales. Aprende técnicas ancestrales y disfruta de un almuerzo con tu propia captura.",
    incluye: ["Equipo de pesca", "Almuerzo", "Bebidas", "Lección de preparación de pescado"],
    anfitrion: {
      nombre: "Pedro Acosta",
      calificacion: 4.6,
      experiencia: "Pescador de tercera generación"
    }
  },
  {
    id: 8,
    nombre: "Recorrido por Haciendas Ganaderas",
    ubicacion: "Planeta Rica, Córdoba",
    precio: 180000,
    calificacion: 4.6,
    imagenUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duracion: "7 horas",
    categoria: "Rural",
    descripcion: "Visita una auténtica hacienda ganadera y conoce las tradiciones de la cultura cordobesa. Aprende sobre el ganado, el ordeño, la elaboración de quesos y disfruta de un día en el campo.",
    incluye: ["Transporte", "Desayuno y almuerzo típico", "Demostración de ordeño", "Paseo a caballo"],
    anfitrion: {
      nombre: "Fernando Reyes",
      calificacion: 4.7,
      experiencia: "Propietario de hacienda tradicional"
    }
  }
];

export default function Experiencias() {
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroPrecio, setFiltroPrecio] = useState("Todos");
  const [filtroDuracion, setFiltroDuracion] = useState("Todas");
  const [experienciasFiltradas, setExperienciasFiltradas] = useState<Experiencia[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Usar los datos definidos fuera del componente
  const experiencias = useMemo(() => datosExperiencias, []);

  // Función para formatear precio en pesos colombianos
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  // Función para renderizar estrellas según calificación
  const renderizarEstrellas = (calificacion: number) => {
    const estrellas = [];
    const calificacionRedondeada = Math.round(calificacion);
    
    for (let i = 0; i < 5; i++) {
      if (i < calificacionRedondeada) {
        estrellas.push(
          <span key={i} className="text-yellow-500">★</span>
        );
      } else {
        estrellas.push(
          <span key={i} className="text-gray-300">★</span>
        );
      }
    }
    
    return (
      <div className="flex items-center">
        {estrellas}
        <span className="ml-1 text-sm text-gray-600">{calificacion.toFixed(1)}</span>
      </div>
    );
  };

  // Filtrar experiencias según los criterios seleccionados
  useEffect(() => {
    let resultado = [...experiencias];
    
    // Filtrar por categoría
    if (filtroCategoria !== "Todas") {
      resultado = resultado.filter(exp => exp.categoria === filtroCategoria);
    }
    
    // Filtrar por rango de precio
    if (filtroPrecio !== "Todos") {
      switch (filtroPrecio) {
        case "Económico":
          resultado = resultado.filter(exp => exp.precio < 80000);
          break;
        case "Moderado":
          resultado = resultado.filter(exp => exp.precio >= 80000 && exp.precio < 130000);
          break;
        case "Premium":
          resultado = resultado.filter(exp => exp.precio >= 130000);
          break;
      }
    }
    
    // Filtrar por duración
    if (filtroDuracion !== "Todas") {
      switch (filtroDuracion) {
        case "Corta":
          resultado = resultado.filter(exp => parseInt(exp.duracion.split(" ")[0]) <= 3);
          break;
        case "Media":
          resultado = resultado.filter(exp => {
            const horas = parseInt(exp.duracion.split(" ")[0]);
            return horas > 3 && horas <= 5;
          });
          break;
        case "Larga":
          resultado = resultado.filter(exp => parseInt(exp.duracion.split(" ")[0]) > 5);
          break;
      }
    }
    
    // Filtrar por búsqueda
    if (busqueda.trim() !== "") {
      const terminoBusqueda = busqueda.toLowerCase();
      resultado = resultado.filter(
        exp => 
          exp.nombre.toLowerCase().includes(terminoBusqueda) ||
          exp.ubicacion.toLowerCase().includes(terminoBusqueda) ||
          exp.descripcion.toLowerCase().includes(terminoBusqueda) ||
          exp.categoria.toLowerCase().includes(terminoBusqueda)
      );
    }
    
    setExperienciasFiltradas(resultado);
  }, [filtroCategoria, filtroPrecio, filtroDuracion, busqueda, experiencias]);

  // Obtener categorías únicas para el filtro
  const categorias = useMemo(() => {
    const cats = new Set(experiencias.map(exp => exp.categoria));
    return ["Todas", ...Array.from(cats)];
  }, [experiencias]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Barra superior */}
      <div className="bg-white p-4 shadow-md flex justify-between items-center">
        <Link href="/turista" className="text-blue-800 hover:text-blue-600 transition-colors">
          <span className="flex items-center p-2 rounded-full hover:bg-blue-50">
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
        <h1 className="text-xl font-bold text-center text-blue-900">Experiencias en Córdoba</h1>
        <button 
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="p-2 rounded-full hover:bg-blue-50 text-blue-800"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </button>
      </div>

      {/* Banner promocional */}
      <div className="relative h-48 md:h-64 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Descubre Córdoba</h2>
          <p className="text-blue-100 md:text-lg max-w-2xl">
            Experiencias auténticas con anfitriones locales que te mostrarán la verdadera esencia de nuestra tierra
          </p>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white p-4 shadow-sm -mt-6 rounded-t-xl mx-4 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar experiencias, lugares o actividades..."
              className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-800 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className={`bg-white px-4 py-2 shadow-sm mx-4 transition-all duration-300 overflow-hidden ${mostrarFiltros ? 'max-h-96' : 'max-h-0'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
            {/* Filtro por categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            {/* Filtro por precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rango de precio</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                value={filtroPrecio}
                onChange={(e) => setFiltroPrecio(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Económico">Económico (menos de $80.000)</option>
                <option value="Moderado">Moderado ($80.000 - $130.000)</option>
                <option value="Premium">Premium (más de $130.000)</option>
              </select>
            </div>
            
            {/* Filtro por duración */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                value={filtroDuracion}
                onChange={(e) => setFiltroDuracion(e.target.value)}
              >
                <option value="Todas">Todas</option>
                <option value="Corta">Corta (hasta 3 horas)</option>
                <option value="Media">Media (4-5 horas)</option>
                <option value="Larga">Larga (más de 5 horas)</option>
              </select>
            </div>
          </div>
          
          {/* Botón para limpiar filtros */}
          <div className="flex justify-end py-2">
            <button 
              className="text-blue-800 hover:text-blue-600 text-sm font-medium"
              onClick={() => {
                setFiltroCategoria("Todas");
                setFiltroPrecio("Todos");
                setFiltroDuracion("Todas");
                setBusqueda("");
              }}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de experiencias */}
      <div className="flex-grow p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {experienciasFiltradas.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="mx-auto text-gray-400 mb-4"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <p className="text-gray-600 text-lg mb-2">No se encontraron experiencias</p>
              <p className="text-gray-500 mb-4">Intenta con otros filtros o términos de búsqueda</p>
              <button 
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => {
                  setFiltroCategoria("Todas");
                  setFiltroPrecio("Todos");
                  setFiltroDuracion("Todas");
                  setBusqueda("");
                }}
              >
                Ver todas las experiencias
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-4">{experienciasFiltradas.length} experiencias encontradas</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experienciasFiltradas.map((experiencia) => (
                  <Link href={`/turista/experiencias/${experiencia.id}`} key={experiencia.id}>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                      <div className="relative h-48 w-full bg-gray-200">
                        {/* Reemplazando el SVG placeholder con una imagen real */}
                        <Image
                          src={experiencia.imagenUrl || "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1000&auto=format&fit=crop"}
                          alt={experiencia.nombre}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                          priority={experiencia.id <= 3}
                        />
                        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-blue-800">
                          {formatearPrecio(experiencia.precio)}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                          <span className="text-white text-xs font-medium px-2 py-1 bg-blue-800 bg-opacity-80 rounded-full">
                            {experiencia.categoria}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-blue-900">{experiencia.nombre}</h3>
                          {renderizarEstrellas(experiencia.calificacion)}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{experiencia.ubicacion}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {experiencia.duracion}
                        </div>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{experiencia.descripcion}</p>
                        <div className="mt-3">
                          <p className="text-xs text-gray-500">Anfitrión: {experiencia.anfitrion.nombre}</p>
                          {renderizarEstrellas(experiencia.anfitrion.calificacion)}
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <button className="w-full bg-blue-800 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center">
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sección de promoción */}
      <div className="bg-blue-50 p-6 border-t border-blue-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-blue-900 mb-2">¿Quieres ofrecer tu propia experiencia?</h3>
              <p className="text-gray-600">Comparte tus conocimientos y pasión por Córdoba con viajeros de todo el mundo</p>
            </div>
            <Link href="/anfitrion/agregar-experiencia">
              <button className="bg-blue-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Convertirme en anfitrión
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}