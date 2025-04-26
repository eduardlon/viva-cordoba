"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
// Remove this line
// import '@types/leaflet';

// Definir interfaces para los tipos de datos
interface PuntoDeInteres {
  id: number;
  nombre: string;
  tipo: string;
  latitud: number;
  longitud: number;
  calificacion: number;
  imagen: string;
  descripcion: string;
}

// Importamos el mapa dinámicamente para evitar problemas de SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Datos de ejemplo para puntos de interés en Montería
const puntosDeInteres: PuntoDeInteres[] = [
  {
    id: 1,
    nombre: "Hotel Manglar",
    tipo: "Alojamiento",
    latitud: 8.7545,
    longitud: -75.8835,
    calificacion: 4.7,
    imagen: "/lugares/hotel-manglar.jpg",
    descripcion: "Hermoso hotel con piscina y excelentes instalaciones."
  },
  {
    id: 2,
    nombre: "Viña Trangalla",
    tipo: "Alojamiento",
    latitud: 8.7605,
    longitud: -75.8765,
    calificacion: 4.5,
    imagen: "/lugares/vina-trangalla.jpg",
    descripcion: "Alojamiento con vistas espectaculares y ambiente tranquilo."
  },
  {
    id: 3,
    nombre: "Ronda del Sinú",
    tipo: "Atracción",
    latitud: 8.7489,
    longitud: -75.8808,
    calificacion: 4.8,
    imagen: "/lugares/ronda-sinu.jpg",
    descripcion: "Hermoso parque lineal a orillas del río Sinú."
  },
  {
    id: 4,
    nombre: "Centro Comercial Alamedas",
    tipo: "Compras",
    latitud: 8.7665,
    longitud: -75.8745,
    calificacion: 4.3,
    imagen: "/lugares/cc-alamedas.jpg",
    descripcion: "El mejor lugar para compras y entretenimiento."
  },
  {
    id: 5,
    nombre: "Restaurante Asados La Parrilla",
    tipo: "Gastronomía",
    latitud: 8.7525,
    longitud: -75.8795,
    calificacion: 4.6,
    imagen: "/lugares/asados-parrilla.jpg",
    descripcion: "Deliciosa comida típica cordobesa a la parrilla."
  }
];

export default function MapaPage() {
  const [mapaListo, setMapaListo] = useState(false);
  const [lugarSeleccionado, setLugarSeleccionado] = useState<PuntoDeInteres | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");

  // Coordenadas del centro de Montería
  const posicionCentral = [8.7545, -75.8835];

  useEffect(() => {
    // Only run this effect once when the component mounts
    if (!mapaListo) {
      // Import Leaflet only on the client side
      import('leaflet').then(L => {
        // Importamos los estilos de Leaflet solo en el cliente
        import("leaflet/dist/leaflet.css");
        
        // Solución para el icono del marcador
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
        
        // Marcamos que el mapa está listo para renderizar
        setMapaListo(true);
      });
    }
  }, []); // Empty dependency array ensures this only runs once

  // Función para renderizar estrellas según calificación
  const renderizarEstrellas = (calificacion) => {
    if (!calificacion && calificacion !== 0) return null;
    
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
      <div className="flex">
        {estrellas}
        <span className="ml-1 text-sm text-[#111111]">{calificacion}</span>
      </div>
    );
  };

  // Filtrar lugares según la categoría seleccionada
  const lugaresFiltrados = filtroCategoria === "Todos" 
    ? puntosDeInteres 
    : puntosDeInteres.filter(lugar => lugar.tipo === filtroCategoria);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF]">
      {/* Barra superior */}
      <div className="bg-white p-4 shadow-md flex justify-between items-center">
        <Link href="/turista" className="text-[#0F47AF] hover:text-[#078930] transition-colors">
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
        <h1 className="text-xl font-bold text-center" style={{ color: '#0F47AF' }}>Explorar Mapa</h1>
        <div className="w-6"></div> {/* Espacio para equilibrar el diseño */}
      </div>

      {/* Filtros de categorías */}
      <div className="bg-white p-4 overflow-x-auto">
        <div className="flex space-x-2">
          {["Todos", "Alojamiento", "Atracción", "Gastronomía", "Compras", "Cultura"].map((categoria) => (
            <button
              key={categoria}
              onClick={() => setFiltroCategoria(categoria)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                filtroCategoria === categoria
                  ? "bg-[#0F47AF] text-white"
                  : "bg-gray-100 text-[#111111] hover:bg-gray-200"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Mapa */}
        <div className="w-full md:w-2/3 h-[50vh] md:h-auto relative">
          {mapaListo && (
            <MapContainer
              center={posicionCentral}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {lugaresFiltrados.map((lugar) => (
                <Marker 
                  key={lugar.id}
                  position={[lugar.latitud, lugar.longitud]}
                  eventHandlers={{
                    click: () => {
                      setLugarSeleccionado(lugar);
                    },
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold text-[#0F47AF]">{lugar.nombre}</h3>
                      <p className="text-sm text-[#111111]">{lugar.tipo}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Panel de recomendaciones */}
        <div className="w-full md:w-1/3 bg-white overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold" style={{ color: '#0F47AF' }}>Lugares recomendados</h2>
            <p className="text-sm text-[#111111]">Descubre los mejores lugares de Montería</p>
          </div>

          <div className="divide-y divide-gray-100">
            {lugaresFiltrados.map((lugar) => (
              <div 
                key={lugar.id} 
                className={`p-4 hover:bg-[#078930] hover:bg-opacity-10 cursor-pointer transition-colors ${
                  lugarSeleccionado?.id === lugar.id ? "bg-[#078930] bg-opacity-10" : ""
                }`}
                onClick={() => setLugarSeleccionado(lugar)}
              >
                <div className="flex">
                  <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden relative flex-shrink-0">
                    {/* Aquí iría la imagen real cuando esté disponible */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium text-[#0F47AF]">{lugar.nombre}</h3>
                    <p className="text-sm text-[#111111]">{lugar.tipo}</p>
                    {renderizarEstrellas(lugar.calificacion)}
                    <p className="text-xs text-[#111111] mt-1 line-clamp-2">{lugar.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel de detalle (aparece cuando se selecciona un lugar) */}
      {lugarSeleccionado && (
        <div className="bg-white p-4 border-t border-gray-200 shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#0F47AF' }}>{lugarSeleccionado.nombre}</h2>
              <p className="text-sm text-[#111111]">{lugarSeleccionado.tipo}</p>
              {renderizarEstrellas(lugarSeleccionado.calificacion)}
            </div>
            <button 
              onClick={() => setLugarSeleccionado(null)}
              className="text-[#111111] hover:text-[#078930]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <p className="mt-2 text-[#111111]">{lugarSeleccionado.descripcion}</p>
          <div className="mt-4 flex space-x-2">
            <button className="bg-[#0F47AF] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0D3E9A] transition-colors">
              Ver detalles
            </button>
            <button className="border border-[#0F47AF] text-[#0F47AF] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#078930] hover:bg-opacity-10 hover:border-[#078930] hover:text-[#078930] transition-colors">
              Cómo llegar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}