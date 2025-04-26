'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaStarHalf, FaSearch, FaLandmark, FaChurch, FaTree, FaUmbrellaBeach, FaUtensils, FaArrowLeft } from 'react-icons/fa';

// Tipos de datos
type TipoTurismo = 'cultural' | 'religioso' | 'ecoturismo' | 'sol-y-playa' | 'gastronomia';

interface Alojamiento {
  id: number;
  nombre: string;
  ubicacion: string;
  precio: number;
  calificacion: number;
  imagen: string;
  caracteristicas: string[];
  tipoAlojamiento: string;
  tiposTurismo: TipoTurismo[];
}

// Datos de ejemplo
const alojamientosData: Alojamiento[] = [
  {
    id: 1,
    nombre: "Hotel Montería Plaza",
    ubicacion: "Centro, Montería",
    precio: 250000,
    calificacion: 4.5,
    imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    caracteristicas: ["WiFi gratis", "Piscina", "Restaurante", "Aire acondicionado"],
    tipoAlojamiento: "Hotel",
    tiposTurismo: ["cultural", "gastronomia"]
  },
  {
    id: 2,
    nombre: "Cabaña Río Sinú",
    ubicacion: "Ribera del Sinú, Montería",
    precio: 180000,
    calificacion: 4.2,
    imagen: "https://images.unsplash.com/photo-1521782462922-9318be1cfd04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    caracteristicas: ["Vista al río", "Terraza", "Cocina", "Parqueadero"],
    tipoAlojamiento: "Cabaña",
    tiposTurismo: ["ecoturismo", "sol-y-playa"]
  },
  {
    id: 3,
    nombre: "Eco Lodge Córdoba",
    ubicacion: "Tierralta, Córdoba",
    precio: 220000,
    calificacion: 4.8,
    imagen: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    caracteristicas: ["Ecoturismo", "Tours guiados", "Desayuno incluido", "Hamacas"],
    tipoAlojamiento: "Lodge",
    tiposTurismo: ["ecoturismo", "cultural"]
  },
  {
    id: 4,
    nombre: "Apartamento Laureles",
    ubicacion: "Laureles, Montería",
    precio: 150000,
    calificacion: 4.0,
    imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    caracteristicas: ["2 habitaciones", "Cocina completa", "Lavadora", "Balcón"],
    tipoAlojamiento: "Apartamento",
    tiposTurismo: ["cultural", "gastronomia"]
  },
  {
    id: 5,
    nombre: "Hostal Backpackers Córdoba",
    ubicacion: "Centro, Montería",
    precio: 60000,
    calificacion: 4.3,
    imagen: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    caracteristicas: ["Habitaciones compartidas", "Cocina común", "Terraza", "Tours"],
    tipoAlojamiento: "Hostal",
    tiposTurismo: ["religioso", "cultural"]
  },
  {
    id: 6,
    nombre: "Resort Playa Blanca",
    ubicacion: "Moñitos, Córdoba",
    precio: 350000,
    calificacion: 4.7,
    imagen: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    caracteristicas: ["Frente al mar", "Piscina infinita", "Spa", "Todo incluido"],
    tipoAlojamiento: "Resort",
    tiposTurismo: ["sol-y-playa", "gastronomia"]
  },
  {
    id: 7,
    nombre: "Posada San Jerónimo",
    ubicacion: "San Jerónimo, Córdoba",
    precio: 120000,
    calificacion: 4.4,
    imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    caracteristicas: ["Desayuno típico", "Cerca a iglesias", "Guías turísticos", "WiFi"],
    tipoAlojamiento: "Posada",
    tiposTurismo: ["religioso", "cultural"]
  },
  {
    id: 8,
    nombre: "Finca Agroturística El Cafetal",
    ubicacion: "Montería Rural",
    precio: 180000,
    calificacion: 4.6,
    imagen: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
    caracteristicas: ["Experiencia agrícola", "Comida típica", "Senderos", "Habitaciones rústicas"],
    tipoAlojamiento: "Finca",
    tiposTurismo: ["ecoturismo", "gastronomia"]
  }
];

// Componente para mostrar estrellas de calificación
const RatingStars = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star-${i}`} className="text-yellow-500" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalf key="half-star" className="text-yellow-500" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-300" />);
  }

  return <div className="flex">{stars}</div>;
};

// Componente para formatear precio en pesos colombianos
const FormatPrice = ({ price }: { price: number }) => {
  return (
    <span>
      {new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(price)}
    </span>
  );
};

// Componente para mostrar iconos de tipo de turismo
const TurismoIcon = ({ tipo }: { tipo: TipoTurismo }) => {
  switch (tipo) {
    case 'cultural':
      return <FaLandmark title="Turismo cultural" className="text-amber-600" />;
    case 'religioso':
      return <FaChurch title="Turismo religioso" className="text-purple-600" />;
    case 'ecoturismo':
      return <FaTree title="Ecoturismo" className="text-green-600" />;
    case 'sol-y-playa':
      return <FaUmbrellaBeach title="Turismo de sol y playa" className="text-blue-500" />;
    case 'gastronomia':
      return <FaUtensils title="Turismo gastronómico" className="text-red-500" />;
    default:
      return null;
  }
};

// Componente principal de la página
export default function AlojamientosPage() {
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>(alojamientosData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTurismo, setFiltroTurismo] = useState<TipoTurismo | ''>('');

  // Efecto para filtrar alojamientos
  useEffect(() => {
    let resultados = alojamientosData;
    
    // Aplicar búsqueda
    if (searchTerm) {
      const termino = searchTerm.toLowerCase();
      resultados = resultados.filter(
        alojamiento =>
          alojamiento.nombre.toLowerCase().includes(termino) ||
          alojamiento.ubicacion.toLowerCase().includes(termino) ||
          alojamiento.caracteristicas.some(c => c.toLowerCase().includes(termino))
      );
    }
    
    // Aplicar filtro por tipo de turismo
    if (filtroTurismo) {
      resultados = resultados.filter(
        alojamiento => alojamiento.tiposTurismo.includes(filtroTurismo as TipoTurismo)
      );
    }
    
    setAlojamientos(resultados);
  }, [searchTerm, filtroTurismo]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Botón para volver a la página anterior */}
      <div className="mb-4">
        <Link href="/turista" className="inline-flex items-center text-[#0F47AF] hover:text-[#078930] transition-colors">
          <FaArrowLeft className="mr-2" /> Volver a Turista
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-[#0F47AF] mb-8 text-center">
        Alojamientos Turísticos en Córdoba
      </h1>
      
      {/* Buscador y filtros */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar por nombre, ubicación o características..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F47AF]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* Filtros por tipo de turismo */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
              filtroTurismo === '' ? 'bg-[#0F47AF] text-white' : 'bg-gray-200 hover:bg-[#078930] hover:text-white'
            }`}
            onClick={() => setFiltroTurismo('')}
          >
            Todos
          </button>
          <button
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
              filtroTurismo === 'cultural' ? 'bg-[#0F47AF] text-white' : 'bg-gray-200 hover:bg-[#078930] hover:text-white'
            }`}
            onClick={() => setFiltroTurismo('cultural')}
          >
            <FaLandmark /> Cultural
          </button>
          <button
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
              filtroTurismo === 'religioso' ? 'bg-[#0F47AF] text-white' : 'bg-gray-200 hover:bg-[#078930] hover:text-white'
            }`}
            onClick={() => setFiltroTurismo('religioso')}
          >
            <FaChurch /> Religioso
          </button>
          <button
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
              filtroTurismo === 'ecoturismo' ? 'bg-[#0F47AF] text-white' : 'bg-gray-200 hover:bg-[#078930] hover:text-white'
            }`}
            onClick={() => setFiltroTurismo('ecoturismo')}
          >
            <FaTree /> Ecoturismo
          </button>
          <button
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
              filtroTurismo === 'sol-y-playa' ? 'bg-[#0F47AF] text-white' : 'bg-gray-200 hover:bg-[#078930] hover:text-white'
            }`}
            onClick={() => setFiltroTurismo('sol-y-playa')}
          >
            <FaUmbrellaBeach /> Sol y Playa
          </button>
          <button
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
              filtroTurismo === 'gastronomia' ? 'bg-[#0F47AF] text-white' : 'bg-gray-200 hover:bg-[#078930] hover:text-white'
            }`}
            onClick={() => setFiltroTurismo('gastronomia')}
          >
            <FaUtensils /> Gastronomía
          </button>
        </div>
      </div>
      
      {/* Resultados */}
      {alojamientos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No se encontraron alojamientos con los criterios seleccionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alojamientos.map((alojamiento) => (
            <div
              key={alojamiento.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={alojamiento.imagen}
                  alt={alojamiento.nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-[#0F47AF]">{alojamiento.nombre}</h2>
                  <span className="bg-[#0F47AF] text-white px-2 py-1 rounded text-sm">
                    {alojamiento.tipoAlojamiento}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{alojamiento.ubicacion}</p>
                <div className="flex items-center mb-3">
                  <RatingStars rating={alojamiento.calificacion} />
                  <span className="ml-2 text-gray-600">({alojamiento.calificacion})</span>
                </div>
                <div className="mb-3">
                  <p className="font-bold text-lg">
                    <FormatPrice price={alojamiento.precio} /> <span className="text-sm font-normal">/ noche</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {alojamiento.tiposTurismo.map((tipo) => (
                    <span key={tipo} className="mr-2 text-lg" title={`Turismo ${tipo}`}>
                      <TurismoIcon tipo={tipo} />
                    </span>
                  ))}
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {alojamiento.caracteristicas.slice(0, 3).map((caracteristica, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                      >
                        {caracteristica}
                      </span>
                    ))}
                    {alojamiento.caracteristicas.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        +{alojamiento.caracteristicas.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
                <Link href={`/turista/alojamientos/${alojamiento.id}`}>
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
  );
}